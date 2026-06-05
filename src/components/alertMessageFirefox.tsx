import StyledAlert from "@/components/styledAlert";

export default function AlertMessageFirefox() {
  return (
    <div className="mx-auto pt-6">
      <StyledAlert status="danger" includeIndicator={true} isBaseSize={true}>
        <div className="space-y-1">
          <p>Page has not been configured for this browser.</p>
          <p>Please try Safari, Chrome, Edge, etc.</p>
        </div>
      </StyledAlert>
    </div>
  );
}
