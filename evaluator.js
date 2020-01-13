const fs = require('fs');

const githubUsername = process.env.GITHUB_ACTOR || 'no_actor';
const githubRepositoryName = process.env.GITHUB_REPOSITORY || 'no_repository';

// https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
const evaluationFileContent = fs.readFileSync(process.argv[2]);
const testData = JSON.parse(evaluationFileContent);
const results = testData.testResults[0].assertionResults;

const mappingFileContent = fs.readFileSync(process.argv[3]);
const mappingUnitTestsToRequirements = JSON.parse(mappingFileContent);

const evaluations = results.map((result) => {
  const testName = result.fullName;
  return {
    requirement_id: mappingUnitTestsToRequirements[testName],
    grade: (result.status === 'passed') ? 3 : 1
  }
});

fs.writeFileSync(process.argv[4], JSON.stringify({
  github_username: githubUsername,
  github_repository_name: githubRepositoryName,
  evaluations: [...evaluations]
}));

process.exit();
