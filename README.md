# jest-evaluator-action
Jest evaluator action for Tryber projects

This action evaluate Trybe projects with [Jest](https://jestjs.io/) library.

## Inputs

## Outputs

### `result`

Jest unit tests JSON results in base64 format.

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
