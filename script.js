// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];
  
  function getLearnerData(course, ag, submissions) {

  const learnerResults = [];
  const assignments = ag.assignments;
  const learnerSub = {};
  const aMap = {};
  //Procces Submissions

  assignments.forEach((assignment) => {
    aMap[assignment.id] = assignment;
  });

  submissions.forEach((submission) => {
    const learnerId = submission.learner_id;
    if (!learnerSub[learnerId]) {
      learnerSub[learnerId] = [];
    }
    learnerSub[learnerId].push(submission);
  });
  
  for (const learnerId in learnerSub) {
    const learnerSubmissions = learnerSub[learnerId];
    const learnerResult = {
      id: parseInt(learnerId),
      avg: 0
    };

    let totalScore = 0;
    let totalPossiblePoints = 0;

    learnerSubmissions.forEach((submission) => {
      const assignmentId = submission.assignment_id;
      const assignment = aMap[assignmentId];
      const pointsPossible = assignment.points_possible;

      let score = submission.submission.score;

      // To be implemented: Handle late penalties

      // Calculate individual assignment score as a proportion
      const proportion = parseFloat((score / pointsPossible).toFixed(3));

      // Add the proportion to learnerResult with assignmentId as key
      learnerResult[assignmentId] = proportion;

      // Update totalScore and totalPossiblePoints
      totalScore += score;
      totalPossiblePoints += pointsPossible;
    });

    // Calculate average score
    learnerResult.avg = parseFloat((totalScore / totalPossiblePoints).toFixed(3));

    learnerResults.push(learnerResult);
  }

  return learnerResults;
  
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);