function hideDiv(div) {
  div.style.display = "none";
}

function hideElem(element) {
  element.setAttribute("hidden", "");
}

function showDiv(div) {
  div.style.visibility = "visible";
  div.style.display = "block";
  div.removeAttribute("hidden");
}

function showElem(elem) {
  elem.removeAttribute("hidden");
}

function playVideo(video) {
  if (video.paused) {
    video.play();
  }
}

function waitForVideoToEnd(video) {
  return new Promise((resolve) => {
    video.addEventListener(
      "ended",
      function () {
        resolve();
      },
      false
    );
  });
}

async function performActionAfterVideo(
  videoWaitToEnd,
  divToHide,
  divToShow,
  elementToPlay
) {
  if (!videoWaitToEnd.paused) {
    await waitForVideoToEnd(videoWaitToEnd);
  }

  hideDiv(divToHide);
  showDiv(divToShow);
  showElem(elementToPlay);
  playVideo(elementToPlay);
}

async function performActionAfterVideoReversed(
  videoWaitToEnd,
  elementToHide,
  elementToShow,
  elementToPlay
) {
  if (!videoWaitToEnd.paused) {
    await waitForVideoToEnd(videoWaitToEnd);
  }

  hideElem(elementToHide);
  showElem(elementToShow);
  playVideo(elementToPlay);
}

async function performactionsFromOneToThree(lastReversed) {
  if (!lastReversed) {
    await performActionAfterVideo(
      document.getElementById("firstVideo"), // wait until end
      document.getElementById("firstSlide"), // to hide
      document.getElementById("secondSlide"), // to show
      document.getElementById("secondVideo") // to run
    );

    await performActionAfterVideo(
      document.getElementById("secondVideo"), // wait until end
      document.getElementById("secondSlide"), // to hide
      document.getElementById("thirdSlide"), // to show
      document.getElementById("thirdVideo") // to run
    );
  } else {
    hideElem(document.getElementById("secondVideoReverse"));
    showElem(document.getElementById("secondVideo"));
    playVideo(document.getElementById("secondVideo"));

    hideElem(document.getElementById("thirdVideoReverse"));
    await performActionAfterVideo(
      document.getElementById("secondVideo"), // wait until end
      document.getElementById("secondSlide"), // to hide
      document.getElementById("thirdSlide"), // to show
      document.getElementById("thirdVideo") // to run
    );
  }
}

async function performactionsFromThreeToOne() {
  if (!document.getElementById("thirdVideo").paused) {
    await waitForVideoToEnd(document.getElementById("thirdVideo"));
  }

  hideElem(document.getElementById("thirdVideo"));
  showElem(document.getElementById("thirdVideoReverse"));
  playVideo(document.getElementById("thirdVideoReverse"));

  hideElem(document.getElementById("secondVideo"));
  await performActionAfterVideo(
    document.getElementById("thirdVideoReverse"), // wait until end
    document.getElementById("thirdSlide"), // to hide
    document.getElementById("secondSlide"), // to show
    document.getElementById("secondVideoReverse") // to run
  );

  // show text
}

function toggleText(textElement, textElementToShow) {
  textElement.style.animationName = "fadeOut";
  textElement.style.animationDuration = "1.5s";
  textElement.style.opacity = 0;

  const animationEndListener = () => {
    hideElem(textElement);
    showElem(textElementToShow);
    textElementToShow.style.animationName = "fadeIn";
    textElementToShow.style.animationDuration = "1.5s";
    textElementToShow.style.opacity = 1;

    textElement.removeEventListener("animationend", animationEndListener);
  };

  textElement.addEventListener("animationend", animationEndListener);
}

document.addEventListener("DOMContentLoaded", function () {
  // slides
  var firstSlide = document.getElementById("firstSlide");
  var secondSlide = document.getElementById("secondSlide");
  var thirdSlide = document.getElementById("thirdSlide");

  // videos standard
  var firstVideo = document.getElementById("firstVideo");
  var secondVideo = document.getElementById("secondVideo");
  var thirdVideo = document.getElementById("thirdVideo");

  // videos reversed
  var secondVideoReverse = document.getElementById("secondVideoReverse");
  var thirdVideoReverse = document.getElementById("thirdVideoReverse");

  // text

  var firstText = document.getElementById("videoText1");
  var secondText = document.getElementById("videoText2");
  var thirdText = document.getElementById("videoText3");

  var currentSlide = 0;
  var lastReversed = false;
  var fullCircle = false;

  document
    .getElementById("firstSliderButton")
    .addEventListener("click", function () {
      if (currentSlide == 1) {
        // I was on second
        if (lastReversed) {
          hideDiv(thirdSlide);
          showDiv(secondSlide);
          performActionAfterVideoReversed(
            thirdVideoReverse,
            secondVideo,
            secondVideoReverse,
            secondVideoReverse
          );
        } else {
          performActionAfterVideoReversed(
            secondVideo,
            secondVideo,
            secondVideoReverse,
            secondVideoReverse
          );
        }
        toggleText(secondText, firstText);

        lastReversed = true;
      } else if (currentSlide == 2) {
        // I was on third
        performactionsFromThreeToOne();
        lastReversed = true;
        toggleText(thirdText, firstText);
      }

      currentSlide = 0;
    });

  document
    .getElementById("secondSliderButton")
    .addEventListener("click", function () {
      if (currentSlide == 0) {
        if (!fullCircle) {
          performActionAfterVideo(
            firstVideo,
            firstSlide,
            secondSlide,
            secondVideo
          );
        } else {
          performActionAfterVideoReversed(
            secondVideoReverse,
            secondVideoReverse,
            secondVideo,
            secondVideo
          );
        }

        toggleText(firstText, secondText);
      } else if (currentSlide == 2) {
        performActionAfterVideoReversed(
          thirdVideo,
          thirdVideo,
          thirdVideoReverse,
          thirdVideoReverse
        );

        lastReversed = true;
        toggleText(thirdText, secondText);
      }

      currentSlide = 1;
    });

  document
    .getElementById("thirdSliderButton")
    .addEventListener("click", function () {
      if (currentSlide == 0) {
        performactionsFromOneToThree(lastReversed);
        toggleText(firstText, thirdText);
      } else if (currentSlide == 1) {
        hideElem(thirdVideoReverse);
        performActionAfterVideo(
          secondVideo,
          secondSlide,
          thirdSlide,
          thirdVideo
        );
        toggleText(secondText, thirdText);
      }

      fullCircle = true;
      currentSlide = 2;
      lastReversed = false;
    });
});
