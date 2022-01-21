import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { FrameButton } from "../../components/buttons/FrameButton/FrameButton";
import {
  AddSvg,
  ArrowLeft,
  ArrowRight,
  AzureIcon,
  DeleteIcon,
  DisabledSvg,
  DownArrowSvg,
  GCSIcon,
  ImageSingle,
  RefreshSvg,
  S3Icon,
  SearchIconSvg,
  SourceMenuSvg,
  TrashcanSvg,
  WebFolderIcon,
  WebProxyIcon,
} from "../../components/icons/index";
import { MultiStory } from "../common/MultiStory";

const _Button = ({ children }: any) => {
  return <div style={{ margin: 12 }}>{children}</div>;
};

export default {
  title: "Styles/Icons",
  component: FrameButton,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof FrameButton>;

const Template: ComponentStory<typeof FrameButton> = (args) => (
  <MultiStory
    style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100%",
      maxWidth: 500,
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      alignContent: "center",
    }}
    stories={[
      {
        label: "AddSvg",
        story: (
          <_Button {...args}>
            <AddSvg />
          </_Button>
        ),
      },
      {
        label: "ArrowLeft",
        story: (
          <_Button {...args}>
            <ArrowLeft />
          </_Button>
        ),
      },
      {
        label: "ArrowRight",
        story: (
          <_Button {...args}>
            <ArrowRight />
          </_Button>
        ),
      },
      {
        label: "AzureIcon",
        story: (
          <_Button {...args}>
            <AzureIcon />
          </_Button>
        ),
      },
      {
        label: "DisabledSvg",
        story: (
          <_Button {...args}>
            <DisabledSvg />
          </_Button>
        ),
      },
      {
        label: "DownArrowSvg",
        story: (
          <_Button {...args}>
            <DownArrowSvg />
          </_Button>
        ),
      },
      {
        label: "GCSIcon",
        story: (
          <_Button {...args}>
            <GCSIcon />
          </_Button>
        ),
      },
      {
        label: "RefreshSvg",
        story: (
          <_Button {...args}>
            <RefreshSvg />
          </_Button>
        ),
      },
      {
        label: "S3Icon",
        story: (
          <_Button {...args}>
            <S3Icon />
          </_Button>
        ),
      },
      {
        label: "SearchIconSvg",
        story: (
          <_Button {...args}>
            <SearchIconSvg />
          </_Button>
        ),
      },
      {
        label: "SourceMenuSvg",
        story: (
          <_Button {...args}>
            <SourceMenuSvg />
          </_Button>
        ),
      },
      {
        label: "ImageSingle",
        story: (
          <_Button {...args}>
            <ImageSingle />
          </_Button>
        ),
      },
      {
        label: "TrashcanSvg",
        story: (
          <_Button {...args}>
            <TrashcanSvg />
          </_Button>
        ),
      },
      {
        label: "DeleteIcon",
        story: (
          <_Button {...args}>
            <DeleteIcon />
          </_Button>
        ),
      },
      {
        label: "WebFolderIcon",
        story: (
          <_Button {...args}>
            <WebFolderIcon />
          </_Button>
        ),
      },
      {
        label: "WebProxyIcon",
        story: (
          <_Button {...args}>
            <WebProxyIcon />
          </_Button>
        ),
      },
    ]}
  ></MultiStory>
);

export const Icons = Template.bind({});
Icons.args = {};
