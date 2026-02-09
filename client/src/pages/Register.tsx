import { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Container } from "../components/ui/Container";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Heading, Text } from "../components/ui/Typography";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { register } = useContext(AuthContext) as any;
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            await register(name, email, password);
            navigate("/");
        } catch (err: any) {
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
            {/* Dynamic Background */}
            <div className="absolute inset-0 bg-midnight z-0" />
            <div className="absolute inset-0 gradient-hero opacity-30 z-0" />

            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-neon-yellow/10 blur-[150px] rounded-full pointer-events-none"
            />

            <Container className="relative z-10 w-full max-w-md">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="text-center mb-8">
                        <Heading level={2} className="mb-2">Join the Safari</Heading>
                        <Text className="text-white/60">Create your account to start discovering</Text>
                    </div>

                    <Card className="!p-8 sm:!p-10 border-white/10 bg-white/5 backdrop-blur-xl">
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-red-500/10 border border-red-500/20 text-red-200 p-3 rounded-lg text-sm mb-6 flex items-center gap-2"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                {error}
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Input
                                label="Full Name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="John Doe"
                                required
                            />

                            <Input
                                label="Email Address"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                            />

                            <Input
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />

                            <Button
                                type="submit"
                                fullWidth
                                disabled={isLoading}
                                className="!mt-6"
                            >
                                {isLoading ? "Creating Account..." : "Sign Up"}
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <Text size="sm" className="text-white/50">
                                Already have an account?{" "}
                                <Link to="/login" className="text-electric-orange hover:text-white transition-colors font-medium">
                                    Sign In
                                </Link>
                            </Text>
                        </div>
                    </Card>
                </motion.div>
            </Container>
        </section>
    );
};

export default Register;
