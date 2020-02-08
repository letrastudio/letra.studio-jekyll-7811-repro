This repo reproduces <https://github.com/jekyll/jekyll/issues/7811>

The bug manifests itself in the `feed.html` layout, where `{{ content }}` is called. If the following conditions are true, `{{ content }}` might return the value for a different instance of the `feed` layout:

- Jekyll version is 4.0.0 or PR #7967
- `jekyll-paginate-v2` 3.0.0 is loaded and pagination is enabled for that page
- `content` contains liquid code

Calling `{{ page.content }}` always returns the right value. I've added it to the layout for ease of comparison. Both are highlighted with a red outline.

The `gh-pages` branch contains a sample build of the site that demonstrates the problem. The pages where the mismatch occurs are:

- /notes/microblog/
- /notes/photos/
- /notes/reviews/

The last one is actually fine, but the other two are taking its `content` value.

As a counterexample, the following pages don't use liquid in `content` and are fine:

- /blog/articles/
- /blog/links/

