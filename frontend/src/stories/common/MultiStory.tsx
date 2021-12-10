export type IStory = {
  label: string;
  story: React.ReactNode;
  options?: {
    flex?: boolean;
    style?: React.CSSProperties;
  };
};

export const MultiStory = ({
  stories,
  style,
  spacingMultiplier = 1,
}: {
  stories: IStory[];
  style?: React.CSSProperties;
  spacingMultiplier?: number;
}) => (
  <div
    style={{
      minHeight: "100vw",
      padding: 16 * spacingMultiplier,
      ...style,
    }}
  >
    {stories.map((story) => (
      <div>
        <div
          style={{
            fontSize: 12,
            lineHeight: 1.66,
            fontWeight: "bold",
            color: "#6C7F8E",
            textTransform: "uppercase",
            marginBottom: 8 * spacingMultiplier,
          }}
        >
          {story.label}
        </div>
        <div
          style={{
            ...(story.options?.flex === false ? {} : { display: "flex" }),
            flexDirection: "column",
            ...(story.options?.style?.width == null && {
              alignItems: "flex-start",
            }),
            marginBottom: 32 * spacingMultiplier,
            ...story.options?.style,
          }}
        >
          {story.story}
        </div>
      </div>
    ))}
  </div>
);
