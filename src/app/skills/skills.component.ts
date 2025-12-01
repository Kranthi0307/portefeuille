import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DecryptionService } from '../common/services/decryption.service';
import { SkillsService } from './skills.service';

interface TreeNode {
  name: string;
  size?: string;
  type?: string;
  children?: TreeNode[];

  // internal fields
  level?: number;
  expanded?: boolean;
  visible?: boolean;
  parent?: TreeNode | null;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {

  skills: any = [];

  rawData: TreeNode[] = [
    {
      name: 'Documents',
      size: '2 MB',
      type: 'folder',
      children: [
        { name: 'Resume.pdf', size: '120 KB', type: 'file' },
        { name: 'Budget.xlsx', size: '340 KB', type: 'file' },
      ],
    },
    {
      name: 'Pictures',
      size: '4 MB',
      type: 'folder',
      children: [
        { name: 'Vacation.jpg', size: '2.1 MB', type: 'file' },
      ],
    },
  ];

  flatData: TreeNode[] = [];

  constructor(private skillsService: SkillsService,
    private decryptionService: DecryptionService
  ) {
    this.flattenData();
   }

  ngOnInit(): void {
    this.skillsService.getSkills().subscribe({
      next: (response: any) => { this.skills = this.groupBySkill(response.map((item: any) => this.decryptionService.decrypt(item))) },
      error: (error: any) => { console.log(error) }
    });
  }

  private groupBySkill(response: { name: string, label: string }[]) {
    const result: { [key: string]: string[] } = {};

    for (let skill of response) {
      if (!result[skill.label]) {
        result[skill.label] = [];
      }
      result[skill.label].push(skill.name);
    }

    return Object.keys(result).map(skill => ({
      label: skill,
      names: result[skill]
    }));
  }

  flattenData() {
    this.flatData = [];
    const traverse = (nodes: TreeNode[], level = 0, parent: TreeNode | null = null) => {
      for (const node of nodes) {
        node.level = level;
        node.expanded = node.expanded ?? false;
        node.visible = parent ? parent.expanded : true;
        node.parent = parent;

        this.flatData.push(node);

        if (node.children) {
          traverse(node.children, level + 1, node);
        }
      }
    };
    traverse(this.rawData);
    console.log('Data ' + this.rawData + ', ' + this.flatData);
  }

  /** Expand/collapse */
  toggle(node: TreeNode) {
    node.expanded = !node.expanded;

    // Update children visibility
    const updateVisibility = (n: TreeNode) => {
      if (n.parent) {
        n.visible = n.parent.expanded && n.parent.visible;
      }
      if (n.children) {
        for (const child of n.children) {
          updateVisibility(child);
        }
      }
    };

    for (const child of node.children ?? []) {
      updateVisibility(child);
    }
  }

  /** Simple sorting */
  sort(column: keyof TreeNode) {
    this.rawData.sort((a, b) => (a[column] || '').toString().localeCompare((b[column] || '').toString()));
    this.flattenData();
  }

  /** Simple filtering */
  applyFilter(text: string) {
    const q = text.toLowerCase();
    for (const node of this.flatData) {
      const match = node.name.toLowerCase().includes(q);
      const parentMatch = this.findParentMatch(node, q);
      node.visible = match || parentMatch;
    }
  }

  findParentMatch(node: TreeNode, q: string): boolean {
    if (!node.parent) return false;
    if (node.parent.name.toLowerCase().includes(q)) return true;
    return this.findParentMatch(node.parent, q);
  }

}
