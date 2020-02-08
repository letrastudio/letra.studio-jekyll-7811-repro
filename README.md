This repo reproduces <https://github.com/jekyll/jekyll/issues/7811>

The bug manifests itself in the `feed.html` layout, where `{{ content }}` is called. If the following conditions are true, `{{ content }}` might return the value for a different instance of the `feed` layout:

- Jekyll version is 4.0.0 or PR #7967
- `jekyll-paginate-v2` 3.0.0 is loaded and pagination is enabled for that page
- `content` contains liquid code

Calling `{{ page.content }}` always returns the right value. I've added it to the layout for ease of comparison. Both are highlighted with a red outline.

The `gh-pages` branch contains a sample build of the site that demonstrates the problem. The mismatch occurs on:

- [/notes/microblog/](https://letrastudio.github.io/letra.studio-jekyll-7811-repro/notes/microblog/)

Which uses the `content` value from:

- [/notes/reviews/](https://letrastudio.github.io/letra.studio-jekyll-7811-repro/notes/reviews/)

More weirdness: the problem seems to be deterministic, but somehow isn't. For many many builds as I was testing, the following page also used the `content` value from `/notes/reviews/`:

- [/notes/photos/](https://letrastudio.github.io/letra.studio-jekyll-7811-repro/notes/photos/)

But at some point that page fixed itself, and I can't make it wrong again by checking out any previous version or nuking `.jekyll-cache`. So I presume that building on a different machine might return different mismatches.

As a counterexample, the following pages don't use liquid in `content` and seem to always be fine:

- [/blog/articles/](https://letrastudio.github.io/letra.studio-jekyll-7811-repro/blog/articles/)
- [/blog/links/](https://letrastudio.github.io/letra.studio-jekyll-7811-repro/blog/links/)
