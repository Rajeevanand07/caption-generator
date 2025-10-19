
import FileUpload from './FileUpload';

// This is the SVG icon for the "AI Magic" step.
const StepIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#006A71" // Dark Teal
    className="w-12 h-12"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 0 0 2.25-2.25V6.75a2.25 2.25 0 0 0-2.25-2.25H6.75A2.25 2.25 0 0 0 4.5 6.75v10.5a2.25 2.25 0 0 0 2.25 2.25Zm.75-12h9v9h-9v-9Z"
    />
  </svg>
);

// This is the new SVG icon for the "Upload" step.
const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#006A71"
    className="w-12 h-12"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
    />
  </svg>
);

// This is the new SVG icon for the "Caption Ready" step.
const ReadyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="#006A71"
    className="h-12 w-12"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
    />
  </svg>
);

// The component that displays a single step, now accepts an icon prop.
const Step = ({ title, description, icon }) => (
  <div className="flex flex-col items-center text-center max-w-xs mx-auto">
    <div className="flex items-center justify-center w-24 h-24 bg-[#9ACBD0] rounded-full mb-5 shadow-lg border-2 border-white">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-[#006A71] mb-2">{title}</h3>
    <p className="text-[#48A6A7]">{description}</p>
  </div>
);


// The main component that arranges everything, renamed to CaptionAI.
const CaptionAI = () => {
  const stepsData = [
    {
      title: "Show Us Your Pic",
      description: "Upload the image you want to post.",
      icon: <UploadIcon />,
    },
    {
      title: "Instant AI Magic",
      description: "Our tool analyzes the scene, objects, and mood.",
      icon: <StepIcon />,
    },
    {
      title: "Caption Ready!",
      description: "Get a creative caption that perfectly matches your photo.",
      icon: <ReadyIcon />,
    },
  ];

  return (
    <section className="bg-[#F2EFE9] w-full min-h-[90vh] py-20 flex flex-col items-center gap-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-black sm:text-5xl">
            Never Get Stuck for Words Again
          </h2>
          <p className="mt-4 text-xl text-[#006A71]">
            Your perfect caption is just three simple steps away.
          </p>
        </div>
        
        {/* This div handles the horizontal layout on medium screens and stacks them on small screens */}
        <div className="mt-16 flex flex-col md:flex-row justify-center items-start gap-y-12 md:gap-x-12">
          {stepsData.map((step, index) => (
            <Step
              key={index}
              title={step.title}
              description={step.description}
              icon={step.icon}
            />
          ))}
        </div>
      </div>
      <FileUpload />
    </section>
  );
};


// The main App component to render the section for preview.
export default CaptionAI;