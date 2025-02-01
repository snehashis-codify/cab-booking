import RegistrationForm from "@/components/auth/registration-form";
import MetaDataProvider from "@/utils/MetaDataProvider";

function Registration() {
  return (
    <div className="flex min-h-screen bg-gray-100 relative overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        alt="Taxi in city"
        style={{ objectFit: "cover" }}
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative w-full flex items-center justify-center p-4 sm:p-8">
        <RegistrationForm />
        <MetaDataProvider
          title="CabEase Registration"
          content="Please signup to continue!!!"
        />
      </div>
    </div>
  );
}

export default Registration;
