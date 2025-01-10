import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

const demo = [
  {
    id: 1,
    name: 'Minerva',
  },
  {
    id: 2,
    name: 'Apollo',
  },
  {
    id: 3,
    name: 'Athena',
  },
  {
    id: 4,
    name: 'Zeus',
  },
  {
    id: 5,
    name: 'Hera',
  },
  {
    id: 6,
    name: 'Poseidon',
  },
];

@Component({
  selector: 'app-admin',
  imports: [RouterOutlet, RouterModule],
  template: `
    <div class="full-page">
      <div class="container">
        <h1 class="font-bold">Admin</h1>
      </div>
      <nav>
        <ul class="large-grid">
          @for (item of demo; track item.name) {
            <li>
              <a [routerLink]="['/tmp', item.id]"
                >Demo {{ item.id }} {{ item.name }}</a
              >
            </li>
          }
        </ul>
      </nav>
      <nav>
        <ul>
          <li><a routerLink="../admin">Admin</a></li>
          <li><a routerLink="role">Role</a></li>
          <li><a routerLink="permission">Permission</a></li>
        </ul>
      </nav>
      <div class="sub-page">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: `
    .sub-page {
      margin-top: 5rem;
    }

    nav {
      margin-top: 2rem;
      font-size: 2rem;

      ul {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        list-style: none;
        padding: 0;
        margin: 0;

        &.large-grid {
          grid-template-columns: repeat(3, 1fr);
        }

        li {
          a {
            display: block;
            width: 100%;
            padding: 1rem;
            background-color: #f0f0f0;
            text-align: center;
            text-decoration: none;
            color: #333;
            border-radius: 0.25rem;
            transition: background-color 0.3s;

            &:hover {
              background-color: #e0e0e0;
            }
          }
        }
      }
    }
  `,
})
export class AdminComponent {
  demo = demo;
}
