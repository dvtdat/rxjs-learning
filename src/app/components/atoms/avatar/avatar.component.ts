import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  inject,
  input,
  model,
  signal,
} from '@angular/core';

import {
  ElementDirective,
  hostElementDirective,
} from '../../../directives/element.directive';

export type AvatarShape = 'circle' | 'square';

@Component({
  selector: 'Avatar',
  imports: [CommonModule],
  host: { '[attr.hidden]': 'hidden() ? true : null' },
  hostDirectives: [hostElementDirective],
  standalone: true,
  template: `<div [ngClass]="avatarClass()">
    @if (src()) {
      <img
        id="avatar"
        [src]="displayedSrc()"
        alt="avatar"
        (error)="onError()"
      />
    } @else {
      {{ !overflow() ? displayedInitials : '+' + displayedOverflowQuantity }}
    }
  </div> `,
  styles: `
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .avatar {
      overflow: hidden;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: var(--blue);
      user-select: none;

      &.small {
        width: 1.75rem;
        height: 1.75rem;
        font-size: 0.75rem;
        line-height: 1rem;
      }

      &.medium {
        width: 2.25rem;
        height: 2.25rem;
        font-size: 0.875rem;
        line-height: 1.25rem;
      }

      &.large {
        width: 2.5rem;
        height: 2.5rem;
        font-size: 1rem;
        line-height: 1.5rem;
      }

      &.circle {
        border-radius: 9999px;
      }

      &.square {
        border-radius: 0.25rem;
      }

      &.no-image {
        background-color: var(--blue-100);
      }

      &.overflow {
        background-color: var(--tertiary-100);
      }

      &.outline {
        outline: 2px solid var(--white);
      }
    }
  `,
})
export class AvatarComponent {
  element = inject(ElementDirective, {
    self: true,
  });

  src = input('');
  firstName = input('');
  lastName = input('');
  shape = input<AvatarShape>('circle');
  overflow = input(0);
  outline = input(false);

  hidden = model(false);
  readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

  displayedInitials = '';
  displayedOverflowQuantity = 0;
  displayedSrc = signal('');

  avatarClass = computed(() =>
    [
      'avatar font-bold',
      this.overflow() ? 'overflow' : '',
      this.outline() ? 'outline' : '',
      this.element.size(),
      this.shape(),
      this.src().length > 0 || this.overflow() ? '' : 'no-image',
    ].join(' '),
  );

  initials = computed(() => {
    if (this.firstName().length === 0 && this.lastName().length === 0) {
      return '';
    }

    return (
      this.firstName().charAt(0).toUpperCase() +
      this.lastName().charAt(0).toUpperCase()
    );
  });

  onError() {
    this.displayedSrc.set('/avatar/default-avatar.svg');
  }

  ngOnInit() {
    this.displayedSrc.set(this.src());
    this.displayedInitials = this.initials().slice(0, 2).toUpperCase();
    this.displayedOverflowQuantity = Math.max(0, Math.min(99, this.overflow()));
  }

  setHidden() {
    this.hidden.set(true);
  }

  setVisible() {
    this.hidden.set(false);
  }
}
