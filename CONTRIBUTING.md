# Libras Contributing Guide

Follow these steps for introducing new features or fixing bugs:

1. [Create an issue](https://help.github.com/articles/creating-an-issue/) assuming one does not already exist;
1. Fork your own copy of this repository to your GitHub account;
1. In your repository, create a branch from `master` using the issue number that you're going to work on;
1. Code in a simple and declarative way, if necessary, comment your code;
1. Make sure to add all necessary tests for your changes;
1. Check code style and make sure that all tests are passing before commiting;
1. Make commits of logical units;
1. Write commit messages that describe the changes clearly and objectively;
1. Create a pull request once implementation is complete.

## Pull Requests

All pull requests should be submitted for review and run automated tests before approval.

Pull requests shouldn't be merged if its rejected or if there're any change request. Pull requests should only be merged with appropriate approvals and if all automated tests passes.

## Code Review

Code reviews should validate code quality, side effects and test coverage. It's very important to check if the tests are covering all the possible scenarios that are being introduced by the new feature or the bug that's being corrected.

Suggested things to consider when performing a code review:

- Has the pull request been connected to an existing issue?
- Does the issue or pull request contain enough information in order to determine whether the fix/new feature is appropriate?
- Have new unit tests been created for any new feature?
- Has the corresponding unit test been updated?
- Has Swagger been updated for the new or revised feature?
- Have all Travis tests passed?
- Has the new code been deployed and tested on a dev (non-staging, non-production) cluster?
- Does the new code require any comments to help understanding the logic?

## Revert Policy

By running tests in advance and by engaging with peer review for prospective changes, your contributions have a high probability of becoming long lived parts of the project. After being merged, the code will run through a series of testing pipelines on a large number of different environments. These pipelines can reveal incompatibilities that are difficult to detect in advance.

If the code change results in a test failure, we will make our best effort to correct the error. If a fix cannot be determined and committed within 24 hours of its discovery, the commit(s) responsible may be reverted, at the discretion of the committer and project maintainers. This action would be taken to help maintain passing states in our testing pipelines.

The original contributor will be notified of the revert in the issue associated with the change. A reference to the test(s) that failed as a result of the code change will also be added to the issue. This test(s) should be used to check future submissions of the code to ensure the problem has been resolved.
