import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DecryptionService } from '../common/services/decryption.service';
import { SkillsService } from './skills.service';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from '../error/error.component';

interface TreeNode {
  name: string;
  children?: TreeNode[];
  expanded?: boolean;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FormsModule, ErrorComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {

  skills: any = [];

  searchText = '';
  sortColumn: string = '';
  sortAsc: boolean = true;
  isError: boolean = false;

  constructor(private skillsService: SkillsService,
    private decryptionService: DecryptionService
  ) { }

  ngOnInit(): void {
    this.skillsService.getSkills().subscribe({
      next: (response: any) => { this.skills = this.groupToTreeNode(response.map((item: any) => this.decryptionService.decrypt(item))) },
      error: (error: any) => { this.isError = true }
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

  private groupToTreeNode(data: any[]): TreeNode[] {
    return Object.values(
      data.reduce((acc: any, item) => {
        if (!acc[item.label]) {
          acc[item.label] = {
            name: item.label,
            expanded: false,
            children: []
          };
        }

        acc[item.label].children.push({
          name: item.name
        });

        return acc;
      }, {})
    );
  }

  toggle(node: TreeNode) {
    node.expanded = !node.expanded;
  }

  /*setSort(column: string) {
    if (this.sortColumn === column) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortColumn = column;
      this.sortAsc = true;
    }

    this.data.sort((a, b) => {
      const A = (a as any)[column].toLowerCase();
      const B = (b as any)[column].toLowerCase();
      return this.sortAsc ? A.localeCompare(B) : B.localeCompare(A);
    });
  }*/

  matchesSearch(node: TreeNode) {
    return node.name.toLowerCase().includes(this.searchText.toLowerCase());
  }
}
