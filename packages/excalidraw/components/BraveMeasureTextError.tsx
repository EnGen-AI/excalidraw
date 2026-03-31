import Trans from "./Trans";

const BraveMeasureTextError = () => {
  return (
    <div data-testid="brave-measure-text-error">
      <p>
        <Trans
          i18nKey="errors.brave_measure_text_error.line1"
          bold={(el) => <span style={{ fontWeight: 600 }}>{el}</span>}
        />
      </p>
      <p>
        <Trans
          i18nKey="errors.brave_measure_text_error.line2"
          bold={(el) => <span style={{ fontWeight: 600 }}>{el}</span>}
        />
      </p>
      <p>
        We strongly recommend disabling this setting. If you need the exact
        steps, contact{" "}
        <a href="mailto:support@engenai.app">EnGenAI support</a>.
      </p>
      <p>
        If disabling this setting does not fix text rendering, open an{" "}
        <a href="https://github.com/EnGen-AI/excalidraw/issues/new">issue</a>{" "}
        in the EnGenAI Draw fork or contact{" "}
        <a href="mailto:support@engenai.app">support</a>.
      </p>
    </div>
  );
};

export default BraveMeasureTextError;
