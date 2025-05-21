import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Azeret Mono, monospace",
    body: "Azeret Mono, monospace",
  },
  components: {
    Link: {
      variants: {
        textButton: {
          fontSize: "xs",
          fontWeight: "medium",
          color: "#ADB5BD"
        }
      }
    },
    Text: {
      variants: {
        helperText: {
          fontSize: "xs",
          fontWeight: "medium",
          color: "#ADB5BD"
        }
      }
    }
  }
});

export default theme;