import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Question {
  id: string;
  category: string;
  question: string;
  type: "likert" | "multiple_choice" | "situational";
  options: string[];
  construct?: string;
}

const questions: Question[] = [
  // Psychometric Questions
  {
    id: "psych_1",
    category: "Psychological Fit",
    question: "I enjoy identifying and preventing vulnerabilities in systems.",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    construct: "Interest"
  },
  {
    id: "psych_2",
    category: "Psychological Fit",
    question: "I work systematically and pay close attention to detail.",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    construct: "Conscientiousness"
  },
  {
    id: "psych_3",
    category: "Psychological Fit",
    question: "I remain calm and focused under pressure.",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    construct: "Emotional Stability"
  },
  {
    id: "psych_4",
    category: "Psychological Fit",
    question: "I enjoy learning new technologies and security frameworks.",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    construct: "Openness"
  },
  // Situational Judgment
  {
    id: "sjt_1",
    category: "Problem Solving",
    question: "You discover a critical security vulnerability in production during peak hours. What's your first action?",
    type: "situational",
    options: [
      "Immediately patch the vulnerability regardless of downtime",
      "Assess the risk level and create a mitigation plan",
      "Wait until off-hours to implement the fix",
      "Notify management and wait for approval"
    ]
  },
  {
    id: "sjt_2",
    category: "Problem Solving",
    question: "A developer requests admin access to production for troubleshooting. How do you respond?",
    type: "situational",
    options: [
      "Grant the access immediately to resolve the issue",
      "Provide temporary limited access with monitoring",
      "Deny the request and offer alternative solutions",
      "Escalate to management for approval"
    ]
  },
  // Technical Knowledge
  {
    id: "tech_1",
    category: "Technical Knowledge",
    question: "Which AWS service is primarily used for managing user identities and access?",
    type: "multiple_choice",
    options: ["EC2", "S3", "IAM", "Lambda"]
  },
  {
    id: "tech_2",
    category: "Technical Knowledge",
    question: "What does the principle of 'least privilege' mean in security?",
    type: "multiple_choice",
    options: [
      "Users get maximum access for convenience",
      "Users get only the minimum access needed for their role",
      "All users have the same access level",
      "Access is granted based on seniority"
    ]
  },
  {
    id: "tech_3",
    category: "Technical Knowledge",
    question: "Which encryption method provides the highest security for data at rest?",
    type: "multiple_choice",
    options: ["AES-128", "AES-256", "DES", "MD5"]
  },
  // WISCAR Framework
  {
    id: "wiscar_w",
    category: "Motivation & Will",
    question: "I persist through difficult challenges even when I don't feel motivated.",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    construct: "Will"
  },
  {
    id: "wiscar_i",
    category: "Interest Alignment",
    question: "I find cybersecurity topics genuinely fascinating and engaging.",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    construct: "Interest"
  },
  {
    id: "wiscar_s",
    category: "Current Skills",
    question: "How comfortable are you with configuring firewall rules and network security?",
    type: "likert",
    options: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"],
    construct: "Skill"
  },
  {
    id: "wiscar_a",
    category: "Learning Ability",
    question: "My abilities and skills can be significantly improved through effort and practice.",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    construct: "Ability"
  }
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeStarted] = useState(Date.now());

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [question.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Assessment complete, navigate to results
      const timeCompleted = Date.now();
      const timeTaken = timeCompleted - timeStarted;
      
      // Store results in localStorage for the results page
      localStorage.setItem('assessmentResults', JSON.stringify({
        answers,
        timeTaken,
        completedAt: timeCompleted
      }));
      
      navigate('/results');
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const canProceed = answers[question.id] !== undefined;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
            Cloud Security Engineer Assessment
          </h1>
          <p className="text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>{question.category}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-8 shadow-elegant">
          <CardHeader>
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[question.id] || ""}
              onValueChange={handleAnswer}
              className="space-y-4"
            >
              {question.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={option}
                    id={`option-${index}`}
                    className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label
                    htmlFor={`option-${index}`}
                    className="flex-1 cursor-pointer py-2 px-3 rounded-lg hover:bg-muted transition-colors"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <Button
            variant={currentQuestion === questions.length - 1 ? "hero" : "gradient"}
            onClick={handleNext}
            disabled={!canProceed}
            className="flex items-center gap-2"
          >
            {currentQuestion === questions.length - 1 ? "Complete Assessment" : "Next"}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Assessment;