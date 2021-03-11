import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { FormEvent, useState } from "react";
import Axios from "axios";
import InputGroup from "../components/InputGroup";
import { useAuthState } from "../context/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const { authenticated } = useAuthState();

  const router = useRouter();

  if (authenticated) {
    router.push("/");
  }
  const submitForm = async (event: FormEvent) => {
    event.preventDefault();
    if (!agreement) {
      setErrors({ ...errors, agreement: "You must agree to T&Cs" });
      return;
    }

    try {
      await Axios.post("/auth/register", {
        //axios baseUrl/auth/register
        email,
        password,
        username,
      });
      router.push("/login");
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className="flex bg-white">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        className="w-40 h-screen bg-center bg-cover"
        style={{ backgroundImage: "url('/images/bricks.jpg" }}
      ></div>
      <div className="flex flex-col justify-center pl-6">
        <div className="w-70">
          <h1 className="mb-2 text-lg font-medium">Signup</h1>
          <p className="mb-10 text-xs">
            By continuing, you agree to our User Agreement and Privacy Policy.
          </p>
          <form onSubmit={submitForm}>
            <div className="mb-6">
              <input
                type="checkbox"
                className="mr-1 cursor-pointer"
                id="agreement"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
              />
              <label
                htmlFor="agreement"
                className="text-xs tracking-tight cursor-pointer"
              >
                I agree to get emails about cool stuff on Reddit
              </label>
              <small className="block font-medium text-red-600">
                {errors.agreement}
              </small>
            </div>
            <InputGroup
              className="mb-2"
              type="email"
              value={email}
              setValue={setEmail}
              placeholder="EMAIL"
              error={errors.email}
            />
            <InputGroup
              className="mb-2"
              type="text"
              value={username}
              setValue={setUsername}
              placeholder="USERNAME"
              error={errors.username}
            />
            <InputGroup
              className="mb-4"
              type="password"
              value={password}
              setValue={setPassword}
              placeholder="PASSWORD"
              error={errors.password}
            />
            <button className="w-full px-3 py-2 text-xs font-bold text-white uppercase bg-blue-500 border-blue-500 rounded">
              Sgin Up
            </button>
          </form>
          <small>
            Already a redditor?
            <Link href="/login">
              <a className="ml-1 text-blue-500 uppercase">LOG IN</a>
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
}
