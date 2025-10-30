import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { cache } from "react";
import { headers } from "next/headers";
import { db } from "../db";
import * as schema from "../db/schema";
import { admin } from "better-auth/plugins";
import {
  sendChangeEmailVerification,
  sendOrganizationInvitationEmail,
  sendVerificationEmail,
  sendResetPasswordEmail,
} from "@/server/auth/email";
import { env } from "@/env";
import { organization } from "better-auth/plugins";
import { eq } from "drizzle-orm";

// 🧠 Main Auth Configuration
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
    usePlural: true,
  }),

  emailAndPassword: {
    enabled: true,

    async sendResetPassword({ url, user, token }) {
      const resetPasswordUrl = `${env.BETTER_AUTH_URL}/reset-password?token=${token}&callbackURL=${encodeURIComponent(url)}`;

      try {
        await sendResetPasswordEmail({
          email: user.email,
          verificationUrl: resetPasswordUrl,
        });
      } catch (error) {
        console.error("sendResetPassword Error:", error);
      }
    },
  },

  plugins: [
    nextCookies(),

    admin({
      adminRoles: ["super_admin"],
      defaultRole: "user",
    }),

    organization({
      async sendInvitationEmail(data, _request) {
        const inviteLink = `${env.BETTER_AUTH_URL}/accept-invitation/${data.id}`;
        try {
          await sendOrganizationInvitationEmail({
            email: data.email,
            inviteLink: inviteLink,
            orgName: data.organization.name,
            inviteId: data.id,
          });
        } catch (error) {
          console.error("sendOrganizationInvitationEmail Error:", error);
        }
      },
    }),
  ],

  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ newEmail, url }, _request) => {
        try {
          await sendChangeEmailVerification({
            email: newEmail,
            verificationUrl: url,
          });
        } catch (error) {
          console.error("sendChangeEmailVerification Error:", error);
        }
      },
    },
  },

  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60 * 1, // 1 hour
    autoSignInAfterVerification: true,

    sendVerificationEmail: async ({ user, token, url }, _request) => {
      const verificationUrl = `${env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${encodeURIComponent(url)}`;

      try {
        await sendVerificationEmail({
          email: user.email,
          verificationUrl: verificationUrl,
        });
      } catch (error) {
        console.error("sendVerificationEmail Error:", error);
      }
    },
  },

  socialProviders: {},
  advanced: {},

  databaseHooks: {
    session: {
      create: {
        before: async (session) => {
          const [member] = await db
            .select({
              organizationId: schema.members.organizationId,
            })
            .from(schema.members)
            .where(eq(schema.members.userId, session.userId))
            .limit(1)
            .execute();

          return {
            data: {
              ...session,
              activeOrganizationId: member?.organizationId,
            },
          };
        },
      },
    },
  },
});

// ✅ Cached session getter
export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});

// ✅ Type helpers
export type Session = typeof auth.$Infer.Session;
export type AuthUserType = Session["user"];
