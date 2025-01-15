function galleryApp() {
    return {
      songs: [],
      searchTerm: "",
      selectedMoods: [],
      availableMoods: [],

      async fetchSongs() {
        const response = await fetch("songs.json");
        this.songs = await response.json();
        this.availableMoods = [
          ...new Set(this.songs.flatMap((song) => song.mood)),
        ];
      },

      get filteredSongs() {
        return this.songs.filter((song) => {
          const searchTermLower = this.searchTerm.toLowerCase();
          const matchesSearch =
            song.title.toLowerCase().includes(searchTermLower) ||
            song.artist.toLowerCase().includes(searchTermLower);
          const matchesMood =
            this.selectedMoods.length === 0 ||
            this.selectedMoods.some((mood) => song.mood.includes(mood));
          return matchesSearch && matchesMood;
        });
      },

      init() {
        this.fetchSongs();
      },
    };
  }