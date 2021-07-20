import Head from "next/head";
import { useState, useEffect, useRef } from "react";

import {
  Heading,
  Text,
  Textarea,
  Button,
  useToast,
  VStack,
  HStack,
  IconButton,
  StackDivider,
  useColorMode,
  Box,
  Link
} from "@chakra-ui/react";
import { transform } from "./transform.js";
import { FaSun, FaMoon } from "react-icons/fa";

export default function Home() {
  let [value, setValue] = useState("");
  let [outputValue, setOutputValue] = useState("");
  let textAreaRef = useRef(null);
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  useEffect(() => {
    try {
      var transformed = transform(value);

      var result = JSON.stringify(transformed, null, 2);
      // var result = JSON.stringify(transformed, null, this.refs.useNewline.checked ? 2 : 0);
      setOutputValue(result);
    } catch (ex) {
      setOutputValue(ex);
    }
  }, [value]);

  let handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  let handleOutputChange = (e) => {
    // let outputValue = e.target.value;
    // setValue(outputValue);
  };

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the the whole text area selected.
    e.target.focus();
    e.target.blur();
    toast({
      title: "Copied",
      status: "success",
      duration: 2000,
      isClosable: true
    });
  }

  return (
    <>
      <Head>
        <title>CSS to React</title>
        <meta
          name="description"
          content="Translate plain CSS into the React in-line style."
        />
        <link rel="icon" href="/logo.svg" />
      </Head>

      <VStack p={4}>
        <IconButton
          icon={colorMode === "light" ? <FaSun /> : <FaMoon />}
          isRound="true"
          size="lg"
          alignSelf="flex-end"
          onClick={toggleColorMode}
        />
        <Heading
          mb="8"
          fontWeight="extrabold"
          size="2xl"
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          bgClip="text"
        >
          CSS to React
        </Heading>
        <Text fontSize="lg">
          Translate plain CSS into the React in-line style.
        </Text>

        <VStack
          divider={<StackDivider />}
          borderColor="gray.100"
          borderWidth="2px"
          p="4"
          borderRadius="lg"
          w="100%"
          maxW={{ base: "90vw", sm: "80vw", lg: "50vw", xl: "40vw" }}
          alignItems="stretch"
        >
          <Textarea
            value={value}
            onChange={handleInputChange}
            placeholder="Type or paste CSS here..."
            size="sm"
          />
          <Textarea
            ref={textAreaRef}
            value={outputValue}
            onChange={handleOutputChange}
            placeholder=""
            size="sm"
          />
        </VStack>

        <HStack mt="8">
          <Button
            colorScheme="pink"
            px="8"
            variant="outline"
            onClick={copyToClipboard}
          >
            Copy to Clipboard
          </Button>
        </HStack>
        <Box
          as="footer"
          role="contentinfo"
          mx="auto"
          maxW="7xl"
          py="12"
          px={{ base: "4", md: "8" }}
        >
          <Text fontSize="sm" alignSelf={{ base: "center", sm: "start" }}>
            {/* {new Date().getFullYear()} */}
            Remade by{" "}
            <Link color="pink.500" href="https://github.com/aeither" isExternal>
              aeither
            </Link>
            . Original by{" "}
            <Link
              color="pink.500"
              href="https://staxmanade.com/CssToReact/"
              isExternal
            >
              Staxmanade
            </Link>
            .
          </Text>
        </Box>
      </VStack>
    </>
  );
}
