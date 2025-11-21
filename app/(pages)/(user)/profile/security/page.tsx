import ChangePasswordForm from "./ChangePasswordForm";
import LogoutDeleteActions from "./LogoutDeleteActions";

export default function SecuritySettingsPage() {
  return (
    <div className="sm:max-w-2xl space-y-10">
      <h1 className="text-3xl font-bold mb-6">Security & Settings</h1>

      <ChangePasswordForm />
      <LogoutDeleteActions />
    </div>
  );
}
