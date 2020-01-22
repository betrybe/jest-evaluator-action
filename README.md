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
  "test-name-1": 17,
  "unit test 2 name": 36,
}
```

where `"test-name-1"` and `"unit test 2 name"` are the tests' name and `17` and `36` are the requirements identifiers.

## Learn about GitHub Actions

- https://help.github.com/en/actions/automating-your-workflow-with-github-actions/creating-a-docker-container-action
