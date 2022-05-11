const execSync = require('child_process').execSync;
const fs = require('fs');

const buildPath = (absolutePath, filePath) => (`${absolutePath}/${filePath}`);

describe('Evaluator', () => {
  it('', () => {
    const currentPath = __dirname;
    const evaluatorFile = buildPath(currentPath, 'evaluator.js');
    const jestOutputFile = buildPath(currentPath, 'tests/jest-output.json');
    const requirementsFile = buildPath(currentPath, 'tests/requirements.json');
    const resultFile = buildPath(currentPath, 'tests/result.json');

    execSync(
      `node ${evaluatorFile} ${jestOutputFile} ${requirementsFile} ${resultFile}`,
      { stdio: 'inherit' }
    );

    const evaluationFileContent = fs.readFileSync(resultFile);
    const resultJson = JSON.parse(evaluationFileContent);

    const expectedResultJson = {
      github_username: resultJson.github_username,
      github_repository_name: resultJson.github_repository_name,
      evaluations: [
        {
          description: "Sum module",
          grade: 3
        },
        {
          description: "Power module",
          grade: 3
        },
        {
          description: "Multiply module",
          grade: 1
        }
      ]
    }

    expect(resultJson).toMatchObject(expectedResultJson);
  });
});
