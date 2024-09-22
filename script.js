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

  function calculateDaysLate(submittedAt, dueAt) {
    const submittedDate = new Date(submittedAt);
    const dueDate = new Date(dueAt);
  
    const timeDifference = submittedDate - dueDate;
    const dayInMs = 24 * 60 * 60 * 1000;
  
    const daysLate = Math.ceil(timeDifference / dayInMs);
  
    return daysLate > 0 ? daysLate : 0;
  }

  // Function to get penalty per day based on days late
function getPenaltyPerDay(daysLate) {
    let penalty;
    switch (true) {
      case daysLate <= 5:
        penalty = 5;
        break;
      case daysLate <= 10:
        penalty = 10;
        break;
      default:
        penalty = 15;
    }
    return penalty;
  }
  
  // Function to calculate proportion
  function calculateProportion(score, pointsPossible) {
    return parseFloat((score / pointsPossible).toFixed(3));
  }
  
  // Main function 
  function getLearnerData(course, ag, submissions) {
    const learnerResults = [];
    let assignments = ag.assignments;
    
    // Remove the last assignment and add a new one
    assignments.pop();
    assignments.push({
        id: 4,
        name: "Advanced JavaScript",
        due_at: "2023-04-30",
        points_possible: 200
    });
  
    // Create a map of assignments for quick access
    const aMap = {};
    assignments.forEach((assignment) => {
      aMap[assignment.id] = assignment;
    });
  
    // Group submissions by learner_id
    const learnerSub = {};
  
    submissions.forEach((submission) => {
      const learnerId = submission.learner_id;
      if (!learnerSub[learnerId]) {
        learnerSub[learnerId] = [];
      }
      learnerSub[learnerId].push(submission);
    });

    //Procces each Learners submissions
    for (const learnerId in learnerSub) {
      const learnerSubmissions = learnerSub[learnerId];
      const learnerResult = {
        id: parseInt(learnerId),
        avg: 0
      };
  
      let totalScore = 0;
      let totalPossiblePoints = 0;
  
      // Create a map of submissions by assignment_id
      const sMap = {};
      learnerSubmissions.forEach((submission) => {
        sMap[submission.assignment_id] = submission;
      });
  
      // Loop through all assignments
      for (let i = 0; i < assignments.length; i++) {
        const assignment = assignments[i];
        const assignmentId = assignment.id;
        const pointsPossible = assignment.points_possible;
  
        if (sMap[assignmentId]) {
          let score = sMap[assignmentId].submission.score;

          // Check for invalid scores
          if (typeof score !== "number" || isNaN(score)) {
            console.warn(`Invalid score for learner ${learnerId} on assignment ${assignmentId}`);
            continue;
          }
  
          // Handle late penalties
          const daysLate = calculateDaysLate(
            sMap[assignmentId].submission.submitted_at,
            assignment.due_at
          );
  
          const penaltyPerDay = 5; // Given in the example
          const penalty = daysLate * penaltyPerDay;
          score = Math.max(score - penalty, 0); // Ensure score is not negative
  
          // Calculate proportion
          const proportion = score / pointsPossible;
  
          // Add to learnerResult
          learnerResult[assignmentId] = parseFloat(proportion.toFixed(3));
  
          // Update totals
          totalScore += score;
          totalPossiblePoints += pointsPossible;
        } else {
          // Assignment not submitted, score is 0
          learnerResult[assignmentId] = 0;
          totalPossiblePoints += pointsPossible;
        }
      };
  
      // Calculate average score
      const average = totalScore / totalPossiblePoints;
      learnerResult.avg = parseFloat(average.toFixed(3));
  
      learnerResults.push(learnerResult);
    }
  
    return learnerResults;
  }
  
  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);