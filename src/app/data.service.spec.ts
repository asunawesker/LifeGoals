import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [
        DataService
      ]
    });
    service = TestBed.inject(DataService);
  });

  it('The api should have some data', (done) => {
    service.getGoals().subscribe(data => { 
        const dataArray: any[] = Array.of(data);
        expect(dataArray.length).toBeGreaterThan(0);
        done();
    });
  });

  it('should add an album and return the artist`s name', () => {
    const newAlbum = { album_name: 'Diamond Eyes', album_artist: 'Deftones' };

    service.newGoal(newAlbum).subscribe(
      data => expect(data.album_artist).toEqual(newAlbum.album_artist),
      fail
    );
  });

  it('should add an album and return the name of the album', () => {
    const newAlbum = { album_name: 'Diamond Eyes', album_artist: 'Deftones' };

    service.newGoal(newAlbum).subscribe(
      data => expect(data.album_name).toEqual(newAlbum.album_name),
      fail
    );
  });

});