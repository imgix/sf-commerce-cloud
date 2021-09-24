# Contributing Guidelines

Below are some guidelines for contributing to the project.

## Workflow

Follow this process if you'd like your work considered for inclusion in the
project:

0.  [Fork](http://help.github.com/fork-a-repo/) the project, clone your fork, and configure the remotes. This is for outside contributions

    ```bash
    # Clone your fork of the repo into the current directory
    git clone git@github.com:<YOUR_USERNAME>/react-imgix.git
    # Navigate to the newly cloned directory
    cd react-imgix
    # Assign the original repo to a remote called "upstream"
    git remote add upstream https://github.com/imgix/react-imgix
    ```

1.  If you cloned a while ago, get the latest changes from upstream:

    ```bash
    git checkout next
    git pull upstream next
    ```

2.  Create a new topic branch (off the main project development branch) to contain your feature, change, or fix:

    ```bash
    git checkout -b <topic-branch-name>
    ```

3.  Commit your changes in logical chunks. Please adhere to these [git commit message guidelines](https://www.conventionalcommits.org/en/v1.0.0/) or your code is unlikely be merged into the main project. Use Git's [interactive rebase](https://help.github.com/articles/interactive-rebase) feature to tidy up your commits before making them public.

4.  Locally merge (or rebase) the upstream development branch into your topic branch:

    ```bash
    git pull [--rebase] upstream next
    ```

5.  Push your topic branch up to your fork:

    ```bash
    git push origin <topic-branch-name>
    ```

6.  [Open a Pull Request](https://help.github.com/articles/using-pull-requests/) with a clear title and description.

7.  If your PR is out of sync with `next`, locally merge (or rebase) the upstream development branch into your topic branch and force push the changes into your topic branch.

    ```bash
    git pull [--rebase] upstream next
    git push origin <topic-branch-name> --force
    ```

8.  If you're happy with your changes and your PR has been approved, rebase and merge your topic branch into the main project development branch using the GitHub PR interface.

**IMPORTANT**: By submitting a patch, you agree to allow the project owner to license your work under the same license as that used by the project.

## Pull Requests

- **Do** branch off `main`. You can always branch off `main`, everyone on the SDK team should have permission to commit directly to each repository. Note: In special cases, it might be necessary to branch off `beta`, `alpha`, or `next` if you are working on a pre-release version of a library. You can find more information here.

- **Do** make, incremental, modular changes. When creating a feature/bug-fix branch, try to keep it to one modular change only.

- **Do** open PRs. There’s no shame in creating a new branch/pull request just to change one character in a file. PRs are free! Use 'em!

- **Do** rebase and merge your PR once approved/ready.

- **Do** clean up your branch history before merging changes into `main`. For example, do not include commits such as `testing` or `does this do anything`. Sometimes it is unavoidable to check in changes like this (such as when testing against CI), but these commits should not make it to the default branch.

- **Do** provide detailed descriptions. Pull requests should include an extremely-detailed description, even if you know your reviewer will have sufficient context on it.

- **Do** provide context that will help future developers. Assume that you are writing the PR description for a future developer (probably yourself) who will stumble across it and need to be reminded of the relevant context.

- **Do** favor Angular-style commit messages. The syntax makes it easy to quickly understand the scope of a commit from its message, e.g. `feat: create new function to build responsive images`. Also see the [Conventional Commit spec](https://www.conventionalcommits.org/en/v1.0.0/) for more details.

- **Do** tag someone on the SDK team to review the pull request once ready. Barring that, someone else on the engineering team who is familiar with the particular language/framework that the pull request is related to.

- **Do** not check compiled, "dist" files into your PRs. Compiling, building, and prepping for distribution should be done in a separate branch or on `main` immediately before releasing.

## Commit Messages

A commit message contains:

- a header specifying the
  - the `type` of commit, i.e. `fix`, `docs`, `feat`, etc. and
  - the `scope` of the commit, i.e. `docs`, `infra`, `core`, `https`, `builder` , `validator`, etc.
- (Optional) a body providing an extremely-detailed description (think what, where, when, why, and/or how), and finally
- (Optional) a footer that should contain a closing reference to an issue, if any.

A full list of commit header types can be found [here](https://www.conventionalcommits.org/en/v1.0.0/).

### Examples

    type(scope): subject

    body

    footer

Given the format, the following message-header states that this commit makes a document-only change, `docs`, scoped to the builder-module, where the typo-fix occurs in the module README. The header is followed by the body that describes the details of the commit.

    docs(builder): Fixes `builder` doc typos in README

    This PR updates the `builder` docs to reflect the latest API change in which
    the `source_path` parameter was renamed to `src_path`.

---

    fix(web-thing): change `thing` to `some_thing` when doing `Z`

    The `thing` component has been used to do `X, Y, and Z`, but the specification
    states that `some_thing` should be preferred under `condition-1 and
    condition-2` when doing `Z`.

    This PR changes `thing` to `some_thing` only when doing `Z` under
    `condition-1 and condition-2`.

    Closes #78559

---

    docs(index.js): Fixes typos on index.md file and fixes on code examples.

    1. While reading the documentation, I encountered `thisVariable` in index.js
      that was referred to as `thatVariable` in the index.md documentation file.
      This PR corrects that typo and
    2. A minor typo in the `Read More` section of index.md
    4. A minor typo in the `Read Less` section of index.md
