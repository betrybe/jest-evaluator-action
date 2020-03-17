# jest-evaluator-action
Jest evaluator action for Tryber projects

This action evaluate Tryber projects with [Jest](https://jestjs.io/) library.

## Inputs

## Outputs

### `result`

Jest unit tests JSON results in base64 format.

### `pr-number`

Pull Request number that trigger build.

## Simple usage example
```yml
uses: betrybe/jest-evaluator-action
```

## How to get result output
```yml
- name: Jest evaluator
  id: evaluator
  uses: betrybe/jest-evaluator-action
- name: Next step
  uses: another-github-action
  with:
    param: ${{ steps.evaluator.outputs.result }}
```

## Project contraints

The project that want to use this action should keep a file called `requirements_mapping.json` in root folder with this structure:

```json
{
  "describe-name-1": 17,
  "describe test 2 name": 36,
}
```

where `"describe-name-1"` and `"describe test 2 name"` are the describe blocks name and `17` and `36` are the requirements identifiers.

Example:

```javascript
describe('describe-name-1', () => {
  it('unit test 1', { ... });
  it('unit test 2', { ... });
  it('unit test 3', { ... });
});
```

The block `describe-name-1` will be assigned with grade `3` if all tests `unit test 1`, `unit test 2` and `unit test 3` are correct.

## Learn about GitHub Actions

- https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-a-docker-container-action
