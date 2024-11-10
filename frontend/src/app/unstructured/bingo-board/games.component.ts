import {Component, OnInit} from '@angular/core';
import {BingoField} from '../model/bingo-field.data';
import {BingoFieldHttpService} from '../../services/bingo-field.http.service';
import {BingoCategory} from '../model/bingo-category.enum';
import {AuthHttpService} from '../../services/auth-http.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {NgIf, TitleCasePipe} from "@angular/common";


@Component({
  selector: 'app-games',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatListItem,
    MatNavList,
    MatSidenav,
    MatSidenavContainer,
    MatSidenavContent,
    NgIf,
    TitleCasePipe
  ],
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss'],
})
export class GamesComponent implements OnInit {
  currentGame: string = 'bingo';

  readonly bingoCategoryEnum = BingoCategory;
  fields: BingoField[] = [];
  activeBingoCategory: BingoCategory | null = null;
  selected: boolean = false;
  text: string | undefined;

  constructor(private readonly bingoFieldHttpService: BingoFieldHttpService,
              private readonly authHttpService: AuthHttpService) {
  }

  ngOnInit(): void {
    this.setCategoryAndFetchBingoItems(BingoCategory.OFFICE);
  }

  toggleSelected(index: number): void {
    this.fields[index].selected = !this.fields[index].selected;
  }

  switchGame(game: string): void {
    this.currentGame = game;
  }

  checkForBingo(): boolean {
    for (let i = 0; i < 5; i++) {
      if (this.fields.slice(i * 5, i * 5 + 5).every(field => field.selected)) {
        return true;
      }
    }
    for (let i = 0; i < 5; i++) {
      if ([0, 1, 2, 3, 4].map(j => this.fields[j * 5 + i]).every(field => field.selected)) {
        return true;
      }
    }
    return false;
  }

  logout(): void {
    this.authHttpService.logout().subscribe();
  }

  shuffle(): void {
    if (!this.selected && this.activeBingoCategory) {
      this.fetchBingoItems(this.activeBingoCategory);
    }
  }

  setCategoryAndFetchBingoItems(category: BingoCategory): void {
    if (this.activeBingoCategory !== category) {
      this.activeBingoCategory = category;
      this.fetchBingoItems(category);
    }
  }

  private fetchBingoItems(category: BingoCategory): void {
    this.bingoFieldHttpService.getBingoItemsByCategory(category).subscribe(items => {
      this.fields = items;
    });
  }

  onClick() {
    this.selected = !this.selected;
  }
}
