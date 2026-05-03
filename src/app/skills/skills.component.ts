import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PublicService } from '../common/services/public.service';
import { ErrorComponent } from '../error/error.component';

interface TreeNode {
  name: string;
  children?: TreeNode[];
  expanded?: boolean;
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [FormsModule, ErrorComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnInit {

  private publicService = inject(PublicService);

  protected skills: any = this.publicService.skills();

  searchText = '';
  //sortColumn: string = '';
  //sortAsc: boolean = true;

  ngOnInit(): void {
    this.skills = this.groupToTreeNode(this.skills);
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
