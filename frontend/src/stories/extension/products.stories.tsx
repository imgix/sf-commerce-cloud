import { ComponentMeta } from "@storybook/react";
import React from "react";
import { injectExtensionAppWithInterval } from "../../index-extension";
import "../../styles/App.css";
import styles from "./products.module.scss";

export const SFImgixProductsSection = () => {
  return (
    <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td
            className={`${styles.tableHeader} ${styles.aldi}`}
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
          <td width="100%">
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
                        images: {
                          primary: {
                            src:
                              "https://cc-zybp-002-sandbox.imgix.net/on/demandware.static/-/Sites-apparel-m-catalog/default/dwdb18b57a/images/large/PG.10221714.JJ169XX.PZ.jpg",
                          },
                          alternatives: [
                            {
                              src:
                                "https://cc-zybp-002-sandbox.imgix.net/on/demandware.static/-/Sites-apparel-m-catalog/default/dwd910a0e9/images/large/PG.10221714.JJ169XX.BZ.jpg",
                              sourceWidth: 3000,
                            },
                          ],
                        },
                        swatchImages: [
                          {
                            src:
                              "https://cc-zybp-002-sandbox.imgix.net/on/demandware.static/-/Sites-apparel-m-catalog/default/dwc3a4d25c/images/swatch/PG.10221714.JJ169XX.CP.jpg",
                          },
                          {
                            src:
                              "https://cc-zybp-002-sandbox.imgix.net/on/demandware.static/-/Sites-apparel-m-catalog/default/dwcb9a6e30/images/swatch/PG.10221714.JJ370XX.CP.jpg",
                          },
                          {
                            src:
                              "https://cc-zybp-002-sandbox.imgix.net/on/demandware.static/-/Sites-apparel-m-catalog/default/dw163523bf/images/swatch/PG.10221714.JJ8UTXX.CP.jpg",
                          },
                          {
                            src:
                              "https://cc-zybp-002-sandbox.imgix.net/on/demandware.static/-/Sites-apparel-m-catalog/default/dw9400c632/images/swatch/PG.10221714.JJ908XX.CP.jpg",
                          },
                          {
                            src:
                              "https://cc-zybp-002-sandbox.imgix.net/on/demandware.static/-/Sites-apparel-m-catalog/default/dwe3dd90d4/images/swatch/PG.10221714.JJI15XX.CP.jpg",
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
    style={{
      width: "90%",
      margin: "64px 5%",
    }}
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
