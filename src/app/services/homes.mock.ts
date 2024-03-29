import { Home } from '../models/home.model';

export class HomesMock {
    static homes: Home[] = [
        {
          title: 'Home 1',
          image: 'assets/listing.jpg',
          location: 'new york',
          price: '125'
        },
        {
          title: 'Home 2',
          image: 'assets/listing.jpg',
          location: 'boston',
          price: '225'
        },
        {
          title: 'Home 3',
          image: 'assets/listing.jpg',
          location: 'chicago',
          price: '325'
        }
    ];
}