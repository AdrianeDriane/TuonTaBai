import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (_, __, profile, done) => {
      try {
        const email = profile.emails?.[0].value;
        if (!email) return done(null, false);

        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // Check if email exists but registered manually
        user = await User.findOne({ email });

        if (user) {
          // Soft merge Google account into manual account
          user.googleId = profile.id;
          user.name = profile.displayName;
          await user.save();
          return done(null, user);
        }

        // If no user with this Google ID or email, then create new/register
        const newUser = await User.create({
          googleId: profile.id,
          email,
          name: profile.displayName,
        });

        return done(null, newUser);
      } catch (error) {
        console.error("Google Strategy Error:", error);
        return done(error, false);
      }
    }
  )
);

