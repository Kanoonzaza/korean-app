/* listening.js — render the Podcast Library from window.PODCASTS.
 * Embeds the official Spotify player where a show id is known; always offers
 * outbound links. Degrades gracefully if embeds can't load (offline).
 */
window.Listening = (function () {

  function esc(s) {
    return String(s || "").replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function card(p) {
    var links = [];
    if (p.youtube) links.push('<a href="' + esc(p.youtube) + '" target="_blank" rel="noopener">YouTube ↗</a>');
    if (p.site) links.push('<a href="' + esc(p.site) + '" target="_blank" rel="noopener">Website ↗</a>');

    var embed = p.spotifyEmbed
      ? '<div class="embed-wrap"><iframe loading="lazy" src="' + esc(p.spotifyEmbed) +
        '" width="100%" height="152" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe></div>'
      : '<p class="muted small">Open on YouTube or the website below to listen.</p>';

    return (
      '<article class="card podcast">' +
        '<div class="podcast-head">' +
          '<h3>' + esc(p.name) + '</h3>' +
          '<span class="tag">' + esc(p.level) + '</span>' +
        '</div>' +
        '<p class="muted">' + esc(p.blurb) + '</p>' +
        embed +
        '<div class="links">' + links.join(" · ") + '</div>' +
      '</article>'
    );
  }

  function render() {
    var list = (window.PODCASTS || []).map(card).join("");
    return (
      '<section class="view">' +
        '<h2>Listening · Podcast Library</h2>' +
        '<p class="muted">Free Korean podcasts for immersion. Streaming needs an internet connection; ' +
          'the rest of the app works offline.</p>' +
        '<div class="podcast-list">' + (list || '<p class="muted">No podcasts configured.</p>') + '</div>' +
      '</section>'
    );
  }

  return { render: render };
})();
