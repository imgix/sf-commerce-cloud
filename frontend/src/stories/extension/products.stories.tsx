import { ComponentMeta } from "@storybook/react";
import React from "react";
import { injectExtensionAppWithInterval } from "../../index-extension";
import styles from "./products.module.scss";

export const SFImgixProductsSection = () => {
  return (
    <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td
            className={`${styles.tableHeader} ${styles.aldi} table_header`}
            colSpan={3}
            width="100%"
          >
            imgix
          </td>
        </tr>
        <tr>
          {/* Here was an image with 0 height... so I just removed it */}
          <td colSpan={3}></td>
        </tr>
        <tr>
          <td className={styles.top}>
            <table cellSpacing="0" cellPadding="0" width="100%">
              <tbody>
                <tr>
                  <td className={styles.fielditem2} align="right">
                    <span
                      data-dw-attruuid="48576099ecdd41387849fbe603"
                      data-dw-tooltip="Product.imgixData"
                    >
                      imgix Images
                    </span>
                    :
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td width="100%" data-testid="custom-attribute">
            <table cellSpacing="0" cellPadding="0" width="100%">
              <tbody>
                <tr>
                  <td
                    id="Meta48576099ecdd41387849fbe603_Container"
                    className={styles.tableDetail}
                    width="100%"
                  >
                    <textarea
                      name="Meta48576099ecdd41387849fbe603"
                      rows={10}
                      className={`${styles.w100} ${styles.textarea}`}
                    >
                      {JSON.stringify({
                        images: [
                          {
                            src: "https://assets.imgix.net/sam-test/cub.jpg",
                            view_type: {
                              large: true,
                              medium: true,
                              small: true,
                            },
                            imgix_metadata: {
                              attributes: {
                                description: "cub",
                                name: "/cub.jpg",
                                origin_path: "/sam-test/cub.jpg",
                                media_height: 0,
                                media_width: 0,
                              },
                              base_url: "assets.imgix.net",
                              id: "51f0282eadfe543b14000003/sam-test/cub.jpg",
                              type: "assets",
                            },
                          },
                        ],
                      })}
                    </textarea>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const NoExtensionTemplate = () => (
  <div
    className={styles.borderBoxInitial}
    style={{
      width: "90%",
      margin: "64px 5%",
    }}
    data-testid="no-extension-template"
  >
    <SFImgixProductsSection />
  </div>
);

export const NoExtension = NoExtensionTemplate.bind({});

const WithExtensionTemplate = () => {
  React.useLayoutEffect(() => {
    injectExtensionAppWithInterval();
  }, []);
  return <NoExtensionTemplate />;
};
export const WithExtension = WithExtensionTemplate.bind({});

export default {
  title: "Extension/Products Imgix Section",
  component: SFImgixProductsSection,
} as ComponentMeta<typeof SFImgixProductsSection>;
