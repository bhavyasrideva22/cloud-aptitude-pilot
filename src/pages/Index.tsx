import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/enhanced-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Cloud, 
  Brain, 
  TrendingUp, 
  CheckCircle, 
  Clock,
  Users,
  Award,
  ArrowRight
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const handleStartAssessment = () => {
    navigate('/assessment');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm">
            Professional Career Assessment
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Is <span className="bg-gradient-hero bg-clip-text text-transparent">Cloud Security Engineer</span> 
            <br />the Right Career for You?
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Discover your readiness for Cloud Security Engineering through our comprehensive, 
            scientifically-backed assessment that evaluates your psychological fit, technical skills, 
            and career alignment.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              variant="hero" 
              size="xl" 
              onClick={handleStartAssessment}
              className="flex items-center gap-2"
            >
              Start Assessment
              <ArrowRight className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span className="text-sm">20-25 minutes</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Assessment Dimensions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">95%</div>
              <div className="text-sm text-muted-foreground">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-success">5K+</div>
              <div className="text-sm text-muted-foreground">Assessments Completed</div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Evaluate */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What We Evaluate</h2>
            <p className="text-muted-foreground text-lg">
              Our comprehensive assessment covers multiple dimensions of career readiness
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <Brain className="w-8 h-8 text-primary mb-2" />
                <CardTitle className="text-lg">Psychological Fit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Personality traits, cognitive style, and behavioral patterns that align with cloud security roles.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <Shield className="w-8 h-8 text-accent mb-2" />
                <CardTitle className="text-lg">Technical Readiness</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Current knowledge of security concepts, cloud platforms, and essential technical skills.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <TrendingUp className="w-8 h-8 text-warning mb-2" />
                <CardTitle className="text-lg">Problem Solving</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Situational judgment and decision-making abilities in security scenarios.
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-elegant hover:shadow-glow transition-all duration-300">
              <CardHeader>
                <Award className="w-8 h-8 text-success mb-2" />
                <CardTitle className="text-lg">WISCAR Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Will, Interest, Skill, Cognitive readiness, Ability to learn, and Real-world alignment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Cloud Security Engineering */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Cloud className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">About Cloud Security Engineering</h2>
            <p className="text-muted-foreground text-lg">
              Understanding the role and career opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>What Cloud Security Engineers Do</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <span className="text-sm">Design and implement security protocols for cloud infrastructure</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <span className="text-sm">Manage identity and access controls (IAM)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <span className="text-sm">Perform threat modeling and vulnerability assessments</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <span className="text-sm">Respond to security incidents and breaches</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                  <span className="text-sm">Ensure compliance with security frameworks</span>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-elegant">
              <CardHeader>
                <CardTitle>Career Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Cloud Security Engineer</div>
                    <div className="text-xs text-muted-foreground">$95K - $165K avg salary</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">DevSecOps Engineer</div>
                    <div className="text-xs text-muted-foreground">$100K - $175K avg salary</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Cloud Security Consultant</div>
                    <div className="text-xs text-muted-foreground">$110K - $190K avg salary</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">IAM Engineer</div>
                    <div className="text-xs text-muted-foreground">$90K - $155K avg salary</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button 
              variant="gradient" 
              size="lg" 
              onClick={handleStartAssessment}
              className="flex items-center gap-2"
            >
              Begin Your Assessment Journey
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
