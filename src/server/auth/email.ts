import nodemailer from "nodemailer";
import { env } from "@/env";
import { render } from "@react-email/render";
import { VerificationEmailTemplate } from "@/modules/email-templates/email-verification";
import { ResetPasswordEmailTemplate } from "@/modules/email-templates/reset-password-email";
import { ChangeEmailVerificationTemplate } from "@/modules/email-templates/change-email-verification";
import { EmployeeInvitationEmail } from "@/modules/email-templates/employee-invitation";

// Create a Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: env.EMAIL_SERVICE, // "gmail"
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async ({
  email,
  verificationUrl,
}: {
  email: string;
  verificationUrl: string;
}) => {
  return transporter.sendMail({
    from: env.EMAIL_FROM,
    to: email,
    subject: "Verify your Email address",
    html: await render(VerificationEmailTemplate({ inviteLink: verificationUrl })),
  });
};

export const sendResetPasswordEmail = async ({
  email,
  verificationUrl,
}: {
  email: string;
  verificationUrl: string;
}) => {
  return transporter.sendMail({
    from: env.EMAIL_FROM,
    to: email,
    subject: "Reset Password Link",
    html: await render(ResetPasswordEmailTemplate({ inviteLink: verificationUrl })),
  });
};

export const sendChangeEmailVerification = async ({
  email,
  verificationUrl,
}: {
  email: string;
  verificationUrl: string;
}) => {
  return transporter.sendMail({
    from: env.EMAIL_FROM,
    to: email,
    subject: "Change Email Verification",
    html: await render(ChangeEmailVerificationTemplate({ inviteLink: verificationUrl })),
  });
};

export const sendOrganizationInvitationEmail = async ({
  email,
  inviteLink,
  orgName,
  inviteId,
}: {
  email: string;
  inviteLink: string;
  orgName: string;
  inviteId?: string;
}) => {
  return transporter.sendMail({
    from: env.EMAIL_FROM,
    to: email,
    subject: "Organization Invitation",
    html: await render(
      EmployeeInvitationEmail({
        invitationLink: inviteLink,
        organizationName: orgName,
        email,
        invitationId: inviteId ?? "N/A",
      })
    ),
  });
};
