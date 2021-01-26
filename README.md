# jest-evaluator-action
Jest evaluator action for Tryber projects

This action evaluate Tryber projects with [Jest](https://jestjs.io/) library.

## Inputs

- `npm-start`

  Optional

  Run npm start and waits to url before testing.

- `wait-for`

  Optional

  Url that npm start command waits for

- `pr_author_username`

  **Required**

  Pull Request author username.

## Outputs

- `result`

  Jest unit tests JSON results in base64 format.

## Usage example

```yml
- uses: betrybe/jest-evaluator-action@v8
  with:
    pr_author_username: ${{ github.event.inputs.pr_author_username }}
  with:
    npm-start: true # false is default
    wait-for: 'http://localhost:8080' # http://localhost:3000 is default
```

## How to get result output
```yml
- name: Jest evaluator
  id: evaluator
  uses: betrybe/jest-evaluator-action@v8
  with:
    pr_author_username: ${{ github.event.inputs.pr_author_username }}
- name: Next step
  uses: another-github-action
  with:
    param: ${{ steps.evaluator.outputs.result }}
```

## Project contraints

The project that want to use this action should implement unit tests grouping them using `describe` statements.
Each `describe` statement will be mapped to a requirement.

Example:

```javascript
describe('requirement #1' () => {
  it('unit test1', () => {});
  it('unit test2', () => {});
  it('unit test3', () => {});
});

describe('requirement #2' () => {
  it('unit test1', () => {});
  it('unit test2', () => {});
  it('unit test3', () => {});
});

describe('requirement #3' () => {
  it('unit test1', () => {});
  it('unit test2', () => {});
  it('unit test3', () => {});
});
```

Project repository must create a file called `requirements.json` inside `.trybe` folder.

This file should have the following structure:

```json
{
  "requirements": [{
    "description": "requirement #1",
    "bonus": false
  }, {
    "description": "requirement #2",
    "bonus": true
  }, {
    "description": "requirement #3",
    "bonus": false
  }]
}
```

where the `"requirement #1"`, `"requirement #2"` and `"requirement #3"` are the requirements and describes names.

## Learn about GitHub Actions

- https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-a-docker-container-action
