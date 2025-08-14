import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TrendingUp, 
  Brain, 
  Shield, 
  Lightbulb,
  BookOpen,
  ArrowRight,
  Home
} from "lucide-react";

interface AssessmentResults {
  answers: Record<string, string>;
  timeTaken: number;
  completedAt: number;
}

interface ScoreBreakdown {
  psychologicalFit: number;
  technicalReadiness: number;
  problemSolving: number;
  wiscar: {
    will: number;
    interest: number;
    skill: number;
    ability: number;
    overall: number;
  };
  overallScore: number;
}

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<AssessmentResults | null>(null);
  const [scores, setScores] = useState<ScoreBreakdown | null>(null);

  useEffect(() => {
    const savedResults = localStorage.getItem('assessmentResults');
    if (!savedResults) {
      navigate('/');
      return;
    }

    const parsedResults: AssessmentResults = JSON.parse(savedResults);
    setResults(parsedResults);

    // Calculate scores based on answers
    const calculatedScores = calculateScores(parsedResults.answers);
    setScores(calculatedScores);
  }, [navigate]);

  const calculateScores = (answers: Record<string, string>): ScoreBreakdown => {
    // Psychometric scoring (Likert scale questions)
    const psychQuestions = ['psych_1', 'psych_2', 'psych_3', 'psych_4'];
    const psychScore = calculateLikertScore(answers, psychQuestions);

    // Technical knowledge scoring
    const techAnswers = {
      'tech_1': 'IAM',
      'tech_2': 'Users get only the minimum access needed for their role',
      'tech_3': 'AES-256'
    };
    const techScore = calculateMultipleChoiceScore(answers, techAnswers);

    // Problem solving (situational judgment)
    const problemSolvingAnswers = {
      'sjt_1': 'Assess the risk level and create a mitigation plan',
      'sjt_2': 'Provide temporary limited access with monitoring'
    };
    const problemScore = calculateMultipleChoiceScore(answers, problemSolvingAnswers);

    // WISCAR scores
    const wiscarScores = {
      will: calculateLikertScore(answers, ['wiscar_w']),
      interest: calculateLikertScore(answers, ['wiscar_i']),
      skill: calculateLikertScore(answers, ['wiscar_s']),
      ability: calculateLikertScore(answers, ['wiscar_a']),
      overall: 0
    };
    wiscarScores.overall = (wiscarScores.will + wiscarScores.interest + wiscarScores.skill + wiscarScores.ability) / 4;

    // Overall weighted score
    const overallScore = Math.round(
      (psychScore * 0.3) + 
      (techScore * 0.3) + 
      (problemScore * 0.2) + 
      (wiscarScores.overall * 0.2)
    );

    return {
      psychologicalFit: psychScore,
      technicalReadiness: techScore,
      problemSolving: problemScore,
      wiscar: wiscarScores,
      overallScore
    };
  };

  const calculateLikertScore = (answers: Record<string, string>, questionIds: string[]): number => {
    const likertMap: Record<string, number> = {
      "Strongly Disagree": 1,
      "Disagree": 2,
      "Neutral": 3,
      "Agree": 4,
      "Strongly Agree": 5,
      "Not at all": 1,
      "Slightly": 2,
      "Moderately": 3,
      "Very": 4,
      "Extremely": 5
    };

    const totalScore = questionIds.reduce((sum, id) => {
      const answer = answers[id];
      return sum + (likertMap[answer] || 0);
    }, 0);

    return Math.round((totalScore / (questionIds.length * 5)) * 100);
  };

  const calculateMultipleChoiceScore = (answers: Record<string, string>, correctAnswers: Record<string, string>): number => {
    const correctCount = Object.keys(correctAnswers).reduce((count, questionId) => {
      return answers[questionId] === correctAnswers[questionId] ? count + 1 : count;
    }, 0);

    return Math.round((correctCount / Object.keys(correctAnswers).length) * 100);
  };

  const getRecommendation = (score: number) => {
    if (score >= 80) {
      return {
        status: "Strong Fit",
        icon: CheckCircle,
        color: "success",
        message: "You demonstrate strong alignment with Cloud Security Engineering. You're ready to pursue this career path with confidence."
      };
    } else if (score >= 60) {
      return {
        status: "Potential Fit",
        icon: AlertCircle,
        color: "warning",
        message: "You show potential for Cloud Security Engineering. With focused learning and skill development, you can succeed in this field."
      };
    } else {
      return {
        status: "Consider Alternatives",
        icon: XCircle,
        color: "destructive",
        message: "Cloud Security Engineering may not be the best fit currently. Consider exploring related fields or foundational learning first."
      };
    }
  };

  const getNextSteps = (score: number) => {
    if (score >= 80) {
      return [
        "Apply for Cloud Security Engineer positions",
        "Pursue AWS/Azure/GCP Security certifications",
        "Join cybersecurity communities and forums",
        "Build a portfolio of security projects"
      ];
    } else if (score >= 60) {
      return [
        "Study cloud security fundamentals",
        "Practice with AWS IAM and security tools",
        "Complete online cybersecurity courses",
        "Gain hands-on experience with cloud platforms"
      ];
    } else {
      return [
        "Explore related fields (Network Security, DevOps)",
        "Build foundational IT and networking skills",
        "Consider cybersecurity bootcamps or degrees",
        "Retake assessment after learning fundamentals"
      ];
    }
  };

  if (!results || !scores) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Analyzing your results...</p>
        </div>
      </div>
    );
  }

  const recommendation = getRecommendation(scores.overallScore);
  const nextSteps = getNextSteps(scores.overallScore);
  const Icon = recommendation.icon;

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4">
            Assessment Results
          </h1>
          <p className="text-muted-foreground text-lg">
            Your personalized Cloud Security Engineer readiness report
          </p>
        </div>

        {/* Overall Score Card */}
        <Card className="mb-8 shadow-elegant border-2 border-primary/20">
          <CardHeader className="text-center pb-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Icon className={`w-8 h-8 text-${recommendation.color}`} />
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {recommendation.status}
              </Badge>
            </div>
            <CardTitle className="text-3xl font-bold text-primary">
              {scores.overallScore}%
              <span className="text-lg text-muted-foreground font-normal ml-2">
                Overall Fit Score
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={scores.overallScore} className="h-3 mb-4" />
            <p className="text-center text-muted-foreground">
              {recommendation.message}
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Score Breakdown */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Score Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-accent" />
                    Psychological Fit
                  </span>
                  <span className="font-semibold">{scores.psychologicalFit}%</span>
                </div>
                <Progress value={scores.psychologicalFit} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Technical Readiness
                  </span>
                  <span className="font-semibold">{scores.technicalReadiness}%</span>
                </div>
                <Progress value={scores.technicalReadiness} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-warning" />
                    Problem Solving
                  </span>
                  <span className="font-semibold">{scores.problemSolving}%</span>
                </div>
                <Progress value={scores.problemSolving} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-success" />
                    WISCAR Overall
                  </span>
                  <span className="font-semibold">{Math.round(scores.wiscar.overall)}%</span>
                </div>
                <Progress value={scores.wiscar.overall} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* WISCAR Detail */}
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>WISCAR Framework Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{scores.wiscar.will}%</div>
                  <div className="text-sm text-muted-foreground">Will</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{scores.wiscar.interest}%</div>
                  <div className="text-sm text-muted-foreground">Interest</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-warning">{scores.wiscar.skill}%</div>
                  <div className="text-sm text-muted-foreground">Skill</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{scores.wiscar.ability}%</div>
                  <div className="text-sm text-muted-foreground">Ability</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="shadow-elegant mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowRight className="w-5 h-5 text-primary" />
              Recommended Next Steps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Button variant="outline" onClick={() => navigate('/')} className="flex items-center gap-2">
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
          <Button variant="hero" onClick={() => window.print()} className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Save Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;