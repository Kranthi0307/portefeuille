import { Component, computed, inject } from '@angular/core';
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
  imports: [FormsModule, ErrorComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {

  protected readonly public_service = inject(PublicService);

  protected treeNodes: any = computed(() => this.groupToTreeNode(this.public_service.skills()));

  searchText = '';

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
      data.reduce((acc: any, item: any) => {
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

  matchesSearch(node: TreeNode) {
    return node.name.toLowerCase().includes(this.searchText.toLowerCase());
  }
}
