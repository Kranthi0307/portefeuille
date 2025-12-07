import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import imagesData from '../../assets/data/image.json';
import { IImage } from '../common/models/image';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  images: IImage[] = imagesData;
  currentIndex = 0;
  interval: any;

  startX = 0;
  currentX = 0;
  isDragging = false;

  constructor(private router: Router) { }

  ngOnInit() {
    this.startAutoPlay();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  startAutoPlay() {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 25000);
  }

  resetAutoPlay() {
    clearInterval(this.interval);
    this.startAutoPlay();
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prevSlide() {
    this.currentIndex =
      this.currentIndex === 0 ? this.images.length - 1 : this.currentIndex - 1;
  }

  goToSlide(i: number) {
    this.currentIndex = i;
    this.resetAutoPlay();
  }

  onTouchStart(event: any) {
    this.isDragging = true;
    this.startX = event.touches ? event.touches[0].clientX : event.clientX;
    this.currentX = this.startX;
    clearInterval(this.interval);
  }

  onTouchMove(event: any) {
    if (!this.isDragging) return;
    this.currentX = event.touches ? event.touches[0].clientX : event.clientX;
  }

  onTouchEnd() {
    if (!this.isDragging) return;

    const deltaX = this.currentX - this.startX;

    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) this.nextSlide();
      else this.prevSlide();
    }

    this.isDragging = false;
    this.resetAutoPlay();
  }

  onMouseLeave() {
    if (this.isDragging) this.onTouchEnd();
  }

  enroute(route?: string) {
    if (!route) return;
    this.router.navigate([route]);
  }
}
