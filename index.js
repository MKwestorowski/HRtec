class App {
    constructor(selector, songList) {
        this.$el = $(selector);
        this.songList = songList;
        this.$playlistView = new Playlist(
            '[data-playlist-view]',
            this.songList
        ).$el;
        this.$playerView = this.$el.find('[data-player-view]');
        this.$songListElement = this.$playlistView.find('.song-list');
        this.nowPlayingIndex = 0;
        this.init();

    }

    init() {
        const initialSong = {
            artist: songList[0].artist,
            title: songList[0].title
        };

        this.renderNowPlaying(initialSong);
        this.attachListeners();
    }

    getSongData(direction)  {
        const songsCount = this.songList.length;


        direction === 'next' ? this.nowPlayingIndex = songsCount -1 < this.nowPlayingIndex + 1 ? 0 : ++this.nowPlayingIndex : null
        direction === 'previous' ? this.nowPlayingIndex = 0 > this.nowPlayingIndex - 1
            ? songsCount - 1
            : --this.nowPlayingIndex : null
        const $currentSongElement = this.$songListElement.find(
            `.song-element:eq(${this.nowPlayingIndex})`
        );
        return {
            artist: $currentSongElement.find('[data-artist]').text(),
            title: $currentSongElement.find('[data-track-title]').text()
        };
    }

    renderNowPlaying({
                         artist,
                         title
                     }) {
        this.$el.find('[data-current-artist]').text(artist);
        this.$el.find('[data-current-title]').text(title);
    }

    toggleViews() {
        $(this.$playlistView, this.$playerView).fadeToggle(300);
    }

    attachListeners() {
        const self = this;
        console.log(self)

        this.$playlistView.on(
            'click',
            '[data-song-info-container]',
            function () {
                const $songToPlay = self.$songListElement
                    .find('[data-song-element]')
                    .index($(this).parent());

                self.nowPlayingIndex = $songToPlay;
                self.renderNowPlaying(self.getSongData());
                self.toggleViews();
            }
        );

        this.$el.find('[data-play-pause]').click(() =>
            $(this).toggleClass('paused')
        );
        this.$el.find('[data-playlist-open], [data-playlist-close]').click(() =>
            self.toggleViews()
        );
        this.$el.find('[data-next]').click(() =>
            self.renderNowPlaying(self.getSongData('next'))
        );
        this.$el.find('[data-prev]').click(() =>
            self.renderNowPlaying(self.getSongData('previous'))
        );
    }
}

class Playlist {
    constructor(selector, songList) {
        this.$el = $(selector);
        this.songList = songList;
        this.renderSongList();
    }

    appendIcon(targetElement, className) {
        const $outerElement = $(`<i class="${className}" aria-hidden="true">`);
        targetElement.append($outerElement);
    }

    renderSongInfo(artist, title, length) {
        const $songInfoContainer = $(
            '<div class="song-info-container" data-song-info-container>'
        );

        const $otherDataElement = $(
            `<span class="other-data">${length} | <span class="artist" data-artist>${artist}</span></span>`
        );

        const $trackTitleElement = $(
            `<span class="track-title" data-track-title>${title}</span>`
        );

        $songInfoContainer.append($otherDataElement);
        $songInfoContainer.append($trackTitleElement);

        return $songInfoContainer;
    }

    renderSongItem(artist = 'Unknown Artist',
                   title = 'Unknown Title',
                   length = '0:00') {
        const $songContainer = $('<section class="song-element" data-song-element>');
        const $iconsContainer = $('<aside class="icons-container">');


        this.appendIcon($iconsContainer, 'fa fa-share-alt');
        this.appendIcon($iconsContainer, 'fa fa-heart');
        $songContainer.append(this.renderSongInfo(...arguments));
        $songContainer.append($iconsContainer);

        return $songContainer;
    }




    renderSongList () {
        const $songListElement = $('<div class="song-list" data-song-list>');

        this.songList.forEach(({
                                   artist,
                                   title,
                                   length
                               }) => {
            $songListElement.append(
                this.renderSongItem(artist, title, length)
            );
        });

        this.$el.append($songListElement);
        $songListElement.perfectScrollbar();
    }
}

const songList = [{
    artist: 'Icona Pop',
    title: 'I Love It',
    length: '1:00'
}, {
    artist: 'Icona Pop',
    title: 'Girlfriend',
    length: '1:00'
}, {
    artist: 'Icona Pop',
    title: 'We Got the World',
    length: '1:00'
}, {
    artist: 'Icona Pop',
    title: 'Nights Like This',
    length: '1:00'
}, {
    artist: 'Icona Pop',
    title: 'All Night',
    length: '1:00'
}, {
    artist: 'Icona Pop',
    title: 'Someone Who Can Dance',
    length: '1:00'
}, {
    artist: 'Icona Pop',
    title: 'Ready For The Weekend',
    length: '1:00'
}, {
    artist: 'Icona Pop',
    title: 'Nights Like This',
    length: '1:00'
}, {
    artist: 'Icona Pop',
    title: 'Nights Like This',
    length: '1:00'
}];



// Zmienić nazwy
// Zmienić nazwy
// Zmienić nazwy
// Zmienić nazwy

const Player = new App('[data-widget-container]', songList);
