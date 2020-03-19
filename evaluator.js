const fs = require('fs');

const CORRECT_ANSWER_GRADE = 3;
const WRONG_ANSWER_GRADE = 1;

const githubUsername = process.env.GITHUB_ACTOR || 'no_actor';
const githubRepositoryName = process.env.GITHUB_REPOSITORY || 'no_repository';

// https://nodejs.org/en/knowledge/command-line/how-to-parse-command-line-arguments/
const evaluationFileContent = fs.readFileSync(process.argv[2]);
const testData = JSON.parse(evaluationFileContent);

const mappingFileContent = fs.readFileSync(process.argv[3]);
const mappingUnitTestsToRequirements = JSON.parse(mappingFileContent);

const evaluations = testData.testResults.map((result) => {
  const describeName = result.assertionResults[0].ancestorTitles[0];

  return {
    requirement_id: mappingUnitTestsToRequirements[describeName],
    grade: (result.status === 'passed') ? CORRECT_ANSWER_GRADE : WRONG_ANSWER_GRADE
  }
});

fs.writeFileSync(process.argv[4], JSON.stringify({
  github_username: githubUsername,
  github_repository_name: githubRepositoryName,
  evaluations: [...evaluations]
}));

process.exit();
