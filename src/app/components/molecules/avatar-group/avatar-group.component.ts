import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  contentChildren,
  effect,
  inject,
  InjectionToken,
  input,
  viewChild,
} from '@angular/core';

import { Size } from '../../../models/size';
import {
  AvatarComponent,
  AvatarShape,
} from '../../atoms/avatar/avatar.component';

export type OverlapGap = 'none' | 'small' | 'medium' | 'large';

export const AvatarGroupConfig = new InjectionToken('AvatarGroupConfig', {
  factory() {
    return {
      size: 'medium' as Size,
      shape: 'circle' as AvatarShape,
      groupSize: 5,
    };
  },
});

@Component({
  selector: 'AvatarGroup',
  imports: [CommonModule, AvatarComponent],
  standalone: true,
  template: `
    <div [ngClass]="avatarGroupClass()">
      <ng-content></ng-content>
      <Avatar
        [overflow]="overflowQuantity()"
        [size]="size()"
        [shape]="shape()"
      ></Avatar>
    </div>
  `,
  styles: [
    `
      .group-container {
        display: flex;
        flex-direction: row;
        height: max-content;
      }

      :host {
        ::ng-deep .group-container.none > * {
          margin-right: 0;
        }

        ::ng-deep .group-container.small > * {
          margin-right: -0.125rem;
        }

        ::ng-deep .group-container.medium > * {
          margin-right: -0.25rem;
        }

        ::ng-deep .group-container.large > * {
          margin-right: -0.5rem;
        }
      }
    `,
  ],
})
export class AvatarGroupComponent {
  overlapGap = input<OverlapGap>('none');

  children = contentChildren(AvatarComponent);
  overflowComponent = viewChild(AvatarComponent);

  childCount = computed(() => this.children()?.length ?? 0);
  overflow = computed(() => this.childCount() > this.config.groupSize);
  overflowQuantity = computed(() =>
    Math.max(0, this.childCount() - this.config.groupSize),
  );

  config = inject(AvatarGroupConfig);

  shape = computed(() => this.children()[0]?.shape());
  size = computed(() => this.children()[0]?.element.size());

  avatarGroupClass = computed(() =>
    ['group-container', this.overlapGap() ? this.overlapGap() : 'none'].join(
      ' ',
    ),
  );

  constructor() {
    effect(() => {
      if (this.overflow()) {
        this.children().forEach((child, index) => {
          if (index >= this.config.groupSize) {
            child.setHidden();
          }
        });

        this.overflowComponent()?.setVisible();
      } else {
        this.overflowComponent()?.setHidden();
      }
    });
  }
}
