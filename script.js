/* =====================================================
   RADIX POINT
   COMPLETE JAVASCRIPT
===================================================== */


/* =====================================================
   MOBILE MENU
===================================================== */

function toggleMenu() {

    var navigation =
        document.getElementById("navigation");

    if (!navigation) return;

    navigation.classList.toggle("active");
}


/* =====================================================
   SEARCH
===================================================== */

function searchTools() {

    var searchInput =
        document.getElementById("toolSearch");

    if (!searchInput) return;

    var search =
        searchInput.value.toLowerCase().trim();

    var tools =
        document.querySelectorAll(".tool-box");

    var found = 0;


    tools.forEach(function(tool) {

        var keywords =
            tool.getAttribute("data-tool") || "";

        var text =
            tool.innerText.toLowerCase();


        if (
            search === "" ||
            keywords.toLowerCase().includes(search) ||
            text.includes(search)
        ) {

            tool.style.display = "";

            found++;

        } else {

            tool.style.display = "none";

        }

    });


    var noTools =
        document.getElementById("noTools");

    var message =
        document.getElementById("searchMessage");


    if (!noTools || !message) return;


    if (search === "") {

        noTools.style.display = "none";

        message.innerHTML = "";

        return;
    }


    if (found === 0) {

        noTools.style.display = "block";

        message.innerHTML =
            "No matching tools found.";

    } else {

        noTools.style.display = "none";

        message.innerHTML =
            found +
            " tool" +
            (found > 1 ? "s" : "") +
            " found.";

    }
}


/* =====================================================
   CLEAR SEARCH
===================================================== */

function clearSearch() {

    var input =
        document.getElementById("toolSearch");

    if (input) {

        input.value = "";

    }

    searchTools();
}


/* =====================================================
   JPG → PNG
===================================================== */

function convertJpgToPng() {

    var input =
        document.getElementById("jpgToPngInput");

    var result =
        document.getElementById("jpgToPngResult");


    if (!input || !result) return;


    if (!input.files.length) {

        result.innerHTML =
            '<div class="result-box">' +
            '⚠️ Please select a JPG image.' +
            '</div>';

        return;
    }


    var file =
        input.files[0];

    var reader =
        new FileReader();


    reader.onload =
        function(event) {

            var image =
                new Image();


            image.onload =
                function() {

                    var canvas =
                        document.createElement("canvas");


                    canvas.width =
                        image.width;

                    canvas.height =
                        image.height;


                    var ctx =
                        canvas.getContext("2d");


                    ctx.drawImage(
                        image,
                        0,
                        0
                    );


                    canvas.toBlob(
                        function(blob) {

                            if (!blob) {

                                result.innerHTML =
                                    '<div class="result-box">' +
                                    '⚠️ Conversion failed.' +
                                    '</div>';

                                return;
                            }


                            var url =
                                URL.createObjectURL(blob);


                            result.innerHTML =

                                '<div class="result-box">' +

                                '<strong>✅ JPG converted to PNG!</strong>' +

                                '<br>' +

                                '<img src="' +
                                url +
                                '">' +

                                '<br>' +

                                '<a class="download-button" href="' +
                                url +
                                '" download="radix-point-converted.png">' +

                                'Download PNG' +

                                '</a>' +

                                '</div>';

                        },
                        "image/png"
                    );

                };


            image.src =
                event.target.result;

        };


    reader.readAsDataURL(file);
}


/* =====================================================
   PNG → JPG
===================================================== */

function convertPngToJpg() {

    var input =
        document.getElementById("pngToJpgInput");

    var result =
        document.getElementById("pngToJpgResult");


    if (!input || !result) return;


    if (!input.files.length) {

        result.innerHTML =
            '<div class="result-box">' +
            '⚠️ Please select a PNG image.' +
            '</div>';

        return;
    }


    var file =
        input.files[0];

    var reader =
        new FileReader();


    reader.onload =
        function(event) {

            var image =
                new Image();


            image.onload =
                function() {

                    var canvas =
                        document.createElement("canvas");


                    canvas.width =
                        image.width;

                    canvas.height =
                        image.height;


                    var ctx =
                        canvas.getContext("2d");


                    ctx.fillStyle =
                        "#ffffff";


                    ctx.fillRect(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );


                    ctx.drawImage(
                        image,
                        0,
                        0
                    );


                    canvas.toBlob(
                        function(blob) {

                            if (!blob) {

                                result.innerHTML =
                                    '<div class="result-box">' +
                                    '⚠️ Conversion failed.' +
                                    '</div>';

                                return;
                            }


                            var url =
                                URL.createObjectURL(blob);


                            result.innerHTML =

                                '<div class="result-box">' +

                                '<strong>✅ PNG converted to JPG!</strong>' +

                                '<br>' +

                                '<img src="' +
                                url +
                                '">' +

                                '<br>' +

                                '<a class="download-button" href="' +
                                url +
                                '" download="radix-point-converted.jpg">' +

                                'Download JPG' +

                                '</a>' +

                                '</div>';

                        },
                        "image/jpeg",
                        0.92
                    );

                };


            image.src =
                event.target.result;

        };


    reader.readAsDataURL(file);
}


/* =====================================================
   QUALITY
===================================================== */

function updateQuality() {

    var quality =
        document.getElementById("quality");

    var text =
        document.getElementById("qualityText");


    if (quality && text) {

        text.textContent =
            quality.value + "%";

    }
}


/* =====================================================
   IMAGE COMPRESSOR
===================================================== */

function compressImage() {

    var input =
        document.getElementById("compressInput");

    var qualityInput =
        document.getElementById("quality");

    var result =
        document.getElementById("compressResult");


    if (
        !input ||
        !qualityInput ||
        !result
    ) return;


    if (!input.files.length) {

        result.innerHTML =
            '<div class="result-box">' +
            '⚠️ Please select an image.' +
            '</div>';

        return;
    }


    var file =
        input.files[0];


    var quality =
        parseInt(
            qualityInput.value
        ) / 100;


    var reader =
        new FileReader();


    reader.onload =
        function(event) {

            var image =
                new Image();


            image.onload =
                function() {

                    var canvas =
                        document.createElement("canvas");


                    canvas.width =
                        image.width;

                    canvas.height =
                        image.height;


                    var ctx =
                        canvas.getContext("2d");


                    ctx.fillStyle =
                        "#ffffff";


                    ctx.fillRect(
                        0,
                        0,
                        canvas.width,
                        canvas.height
                    );


                    ctx.drawImage(
                        image,
                        0,
                        0
                    );


                    canvas.toBlob(
                        function(blob) {

                            if (!blob) {

                                result.innerHTML =
                                    '<div class="result-box">' +
                                    '⚠️ Compression failed.' +
                                    '</div>';

                                return;
                            }


                            var url =
                                URL.createObjectURL(blob);


                            var originalKB =
                                (
                                    file.size / 1024
                                ).toFixed(1);


                            var compressedKB =
                                (
                                    blob.size / 1024
                                ).toFixed(1);


                            result.innerHTML =

                                '<div class="result-box">' +

                                '<strong>✅ Image compressed!</strong>' +

                                '<p>Original: ' +
                                originalKB +
                                ' KB</p>' +

                                '<p>Compressed: ' +
                                compressedKB +
                                ' KB</p>' +

                                '<a class="download-button" href="' +
                                url +
                                '" download="radix-point-compressed.jpg">' +

                                'Download Image' +

                                '</a>' +

                                '</div>';

                        },
                        "image/jpeg",
                        quality
                    );

                };


            image.src =
                event.target.result;

        };


    reader.readAsDataURL(file);
}


/* =====================================================
   IMAGE RESIZER
===================================================== */

function resizeImage() {

    var input =
        document.getElementById("resizeInput");

    var widthInput =
        document.getElementById("resizeWidth");

    var heightInput =
        document.getElementById("resizeHeight");

    var result =
        document.getElementById("resizeResult");


    if (
        !input ||
        !widthInput ||
        !heightInput ||
        !result
    ) return;


    if (!input.files.length) {

        result.innerHTML =
            '<div class="result-box">' +
            '⚠️ Please select an image.' +
            '</div>';

        return;
    }


    var width =
        parseInt(
            widthInput.value
        );


    var height =
        parseInt(
            heightInput.value
        );


    if (
        !width ||
        !height ||
        width <= 0 ||
        height <= 0
    ) {

        result.innerHTML =
            '<div class="result-box">' +
            '⚠️ Enter a valid width and height.' +
            '</div>';

        return;
    }


    var file =
        input.files[0];

    var reader =
        new FileReader();


    reader.onload =
        function(event) {

            var image =
                new Image();


            image.onload =
                function() {

                    var canvas =
                        document.createElement("canvas");


                    canvas.width =
                        width;

                    canvas.height =
                        height;


                    var ctx =
                        canvas.getContext("2d");


                    ctx.drawImage(
                        image,
                        0,
                        0,
                        width,
                        height
                    );


                    canvas.toBlob(
                        function(blob) {

                            if (!blob) {

                                result.innerHTML =
                                    '<div class="result-box">' +
                                    '⚠️ Resize failed.' +
                                    '</div>';

                                return;
                            }


                            var url =
                                URL.createObjectURL(blob);


                            result.innerHTML =

                                '<div class="result-box">' +

                                '<strong>✅ Image resized!</strong>' +

                                '<p>New size: ' +
                                width +
                                ' × ' +
                                height +
                                ' px</p>' +

                                '<img src="' +
                                url +
                                '">' +

                                '<br>' +

                                '<a class="download-button" href="' +
                                url +
                                '" download="radix-point-resized.jpg">' +

                                'Download Image' +

                                '</a>' +

                                '</div>';

                        },
                        "image/jpeg",
                        0.92
                    );

                };


            image.src =
                event.target.result;

        };


    reader.readAsDataURL(file);
}


/* =====================================================
   IMAGE → PDF
===================================================== */

function createPDF() {

    var input =
        document.getElementById("pdfInput");

    var result =
        document.getElementById("pdfResult");


    if (!input || !result) return;


    if (!input.files.length) {

        result.innerHTML =
            '<div class="result-box">' +
            '⚠️ Please select an image.' +
            '</div>';

        return;
    }


    if (
        typeof window.jspdf === "undefined" ||
        typeof window.jspdf.jsPDF === "undefined"
    ) {

        result.innerHTML =
            '<div class="result-box">' +
            '⚠️ PDF library could not load. ' +
            'Check your internet connection.' +
            '</div>';

        return;
    }


    var file =
        input.files[0];

    var reader =
        new FileReader();


    reader.onload =
        function(event) {

            var image =
                new Image();


            image.onload =
                function() {

                    var jsPDF =
                        window.jspdf.jsPDF;


                    var pdf =
                        new jsPDF({

                            orientation: "portrait",

                            unit: "mm",

                            format: "a4"

                        });


                    var pageWidth =
                        210;

                    var pageHeight =
                        297;

                    var margin =
                        10;


                    var maxWidth =
                        pageWidth -
                        margin * 2;


                    var maxHeight =
                        pageHeight -
                        margin * 2;


                    var ratio =
                        Math.min(
                            maxWidth / image.width,
                            maxHeight / image.height
                        );


                    var imgWidth =
                        image.width * ratio;


                    var imgHeight =
                        image.height * ratio;


                    var x =
                        (
                            pageWidth -
                            imgWidth
                        ) / 2;


                    var y =
                        (
                            pageHeight -
                            imgHeight
                        ) / 2;


                    pdf.addImage(
                        image,
                        "JPEG",
                        x,
                        y,
                        imgWidth,
                        imgHeight
                    );


                    var blob =
                        pdf.output("blob");


                    var url =
                        URL.createObjectURL(blob);


                    result.innerHTML =

                        '<div class="result-box">' +

                        '<strong>✅ PDF created successfully!</strong>' +

                        '<br><br>' +

                        '<a class="download-button" href="' +
                        url +
                        '" download="radix-point-image.pdf">' +

                        'Download PDF' +

                        '</a>' +

                        '</div>';

                };


            image.src =
                event.target.result;

        };


    reader.readAsDataURL(file);
}


/* =====================================================
   RADIX AI
===================================================== */


/* OPEN / CLOSE */

function toggleChat() {

    var chatbot =
        document.getElementById("chatbot");


    if (!chatbot) {

        console.error(
            "Radix AI window not found."
        );

        return;
    }


    if (
        chatbot.style.display === "flex"
    ) {

        chatbot.style.display =
            "none";

    } else {

        chatbot.style.display =
            "flex";


        setTimeout(
            function() {

                var input =
                    document.getElementById(
                        "chatInput"
                    );


                if (input) {

                    input.focus();

                }

            },
            100
        );

    }
}


/* =====================================================
   ENTER KEY
===================================================== */

function handleChatKey(event) {

    if (event.key === "Enter") {

        event.preventDefault();

        sendChat();

    }
}


/* =====================================================
   QUICK CHAT
===================================================== */

function quickChat(question) {

    var input =
        document.getElementById(
            "chatInput"
        );


    if (!input) return;


    input.value =
        question;


    sendChat();
}


/* =====================================================
   ADD CHAT MESSAGE
===================================================== */

function addChatMessage(
    message,
    type
) {

    var messages =
        document.getElementById(
            "chatMessages"
        );


    if (!messages) return;


    var div =
        document.createElement(
            "div"
        );


    if (type === "user") {

        div.className =
            "user-message";

    } else {

        div.className =
            "bot-message";

    }


    div.innerHTML =
        message;


    messages.appendChild(
        div
    );


    messages.scrollTop =
        messages.scrollHeight;
}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(text) {

    return text

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );
}


/* =====================================================
   SEND CHAT
===================================================== */

function sendChat() {

    var input =
        document.getElementById(
            "chatInput"
        );


    if (!input) return;


    var question =
        input.value.trim();


    if (question === "") {

        return;

    }


    addChatMessage(
        escapeHTML(question),
        "user"
    );


    input.value = "";


    setTimeout(
        function() {

            var reply =
                getBotReply(
                    question
                );


            addChatMessage(
                reply,
                "bot"
            );

        },
        350
    );
}


/* =====================================================
   RADIX AI KNOWLEDGE
===================================================== */

var radixKnowledge = {

    name:
        "Radix Point",

    assistant:
        "Radix AI",

    email:
        "radixpoint.co@gmail.com",

    tagline:
        "Smart Tools. Simple Solutions.",

    purpose:
        "Radix Point is a simple online platform that brings useful digital tools together for students and everyday users.",

    speciality:
        "Radix Point focuses on simple browser-based file tools that are fast, easy to use, mobile-friendly and privacy-focused.",

    history:
        "Radix Point was created with the idea of building a simple digital toolbox where students and everyday users could complete common file tasks without complicated software.",

    privacy:
        "The current image tools process files directly inside the browser. Files are not intentionally uploaded to a Radix Point server.",

    platforms:
        "Radix Point is designed to work on mobile phones, Android devices, tablets and desktop browsers.",

    future:
        "Radix Point is planned to grow with more AI tools, document tools, file converters, student utilities and other useful digital services."

};


/* =====================================================
   RADIX AI RESPONSE ENGINE
===================================================== */

function getBotReply(question) {

    var q =
        question.toLowerCase().trim();


    /* GREETING */

    if (
        q === "hi" ||
        q === "hello" ||
        q === "hey" ||
        q.includes("hello radix") ||
        q.includes("hi radix")
    ) {

        return (

            "Hello! 👋✦<br><br>" +

            "I'm <strong>Radix AI</strong>, " +
            "your smart assistant inside Radix Point.<br><br>" +

            "Ask me about tools, formats, privacy, " +
            "features, how to use the website, " +
            "or anything about Radix Point."

        );
    }


    /* IDENTITY */

    if (
        q.includes("who are you") ||
        q.includes("your name") ||
        q.includes("what are you") ||
        q.includes("are you ai")
    ) {

        return (

            "I'm <strong>Radix AI</strong> ✦🤖<br><br>" +

            "I'm the built-in assistant for Radix Point.<br><br>" +

            "I can explain the website, tools, formats, " +
            "features, privacy, purpose and future plans."

        );
    }


    /* WHAT IS RADIX POINT */

    if (
        q.includes("what is radix") ||
        q.includes("what is radix point") ||
        q === "radix point"
    ) {

        return (

            "<strong>Radix Point</strong> 🚀<br><br>" +

            "Radix Point is a simple online toolbox " +
            "for students and everyday users.<br><br>" +

            "You can convert, compress, resize and " +
            "turn images into PDFs directly from your browser.<br><br>" +

            "<strong>Smart Tools. Simple Solutions.</strong>"

        );
    }


    /* PURPOSE */

    if (
        q.includes("purpose") ||
        q.includes("mission") ||
        q.includes("goal")
    ) {

        return (

            "<strong>Our Purpose</strong> 🎯<br><br>" +

            radixKnowledge.purpose +

            "<br><br>" +

            "The goal is to make useful digital tools " +
            "simple, accessible and easy to use."

        );
    }


    /* SPECIAL */

    if (
        q.includes("special") ||
        q.includes("unique") ||
        q.includes("different") ||
        q.includes("why radix")
    ) {

        return (

            "<strong>What makes Radix Point special?</strong> ✦<br><br>" +

            "• Simple interface<br>" +
            "• Browser-based processing<br>" +
            "• No complicated software installation<br>" +
            "• Useful for students<br>" +
            "• Mobile-friendly<br>" +
            "• Privacy-focused processing<br>" +
            "• Free basic tools<br>" +
            "• Radix AI assistant<br>" +
            "• More tools planned"

        );
    }


    /* HISTORY */

    if (
        q.includes("history") ||
        q.includes("started") ||
        q.includes("created") ||
        q.includes("origin")
    ) {

        return (

            "<strong>Radix Point History</strong> 📖<br><br>" +

            radixKnowledge.history +

            "<br><br>" +

            "The vision is to put useful digital tools " +
            "in one simple platform."

        );
    }


    /* TOOLS */

    if (
        q.includes("tools") ||
        q.includes("available tools") ||
        q.includes("what tools") ||
        q.includes("what can i do")
    ) {

        return (

            "<strong>Current Radix Point Tools</strong> 🛠️<br><br>" +

            "1. 🖼️ <strong>JPG → PNG</strong><br>" +
            "Convert JPG/JPEG images to PNG.<br><br>" +

            "2. 📷 <strong>PNG → JPG</strong><br>" +
            "Convert PNG images to JPG.<br><br>" +

            "3. 📦 <strong>Image Compressor</strong><br>" +
            "Reduce image file size.<br><br>" +

            "4. 📐 <strong>Image Resizer</strong><br>" +
            "Change image width and height.<br><br>" +

            "5. 📄 <strong>JPG / PNG → PDF</strong><br>" +
            "Create an A4 PDF from an image."

        );
    }


    /* JPG TO PNG */

    if (
        q.includes("jpg to png") ||
        q.includes("jpeg to png")
    ) {

        return (

            "<strong>JPG → PNG</strong> 🖼️<br><br>" +

            "This tool converts JPG/JPEG images into PNG format.<br><br>" +

            "<strong>How to use:</strong><br>" +

            "1. Select a JPG image.<br>" +
            "2. Tap Convert to PNG.<br>" +
            "3. Download your PNG file."

        );
    }


    /* PNG TO JPG */

    if (
        q.includes("png to jpg") ||
        q.includes("png to jpeg")
    ) {

        return (

            "<strong>PNG → JPG</strong> 📷<br><br>" +

            "This tool converts PNG images into JPG format.<br><br>" +

            "Transparent areas are placed on a white background.<br><br>" +

            "Select PNG → Convert → Download."

        );
    }


    /* COMPRESSOR */

    if (
        q.includes("compress") ||
        q.includes("compression") ||
        q.includes("reduce image size")
    ) {

        return (

            "<strong>Image Compressor</strong> 📦<br><br>" +

            "The compressor reduces image file size " +
            "by adjusting JPEG quality.<br><br>" +

            "• Lower quality → usually smaller file<br>" +
            "• Higher quality → usually better detail<br><br>" +

            "Choose your image, select quality and tap " +
            "<strong>Compress Image</strong>."

        );
    }


    /* RESIZER */

    if (
        q.includes("resize") ||
        q.includes("resizer") ||
        q.includes("width") ||
        q.includes("height")
    ) {

        return (

            "<strong>Image Resizer</strong> 📐<br><br>" +

            "Use the resizer to change an image's dimensions.<br><br>" +

            "Enter the required <strong>width</strong> and " +
            "<strong>height</strong> in pixels, select your image " +
            "and tap <strong>Resize Image</strong>."

        );
    }


    /* PDF */

    if (
        q.includes("pdf") ||
        q.includes("image to pdf") ||
        q.includes("create pdf") ||
        q.includes("make pdf")
    ) {

        return (

            "<strong>JPG / PNG → PDF</strong> 📄<br><br>" +

            "This tool converts an image into an A4 PDF document.<br><br>" +

            "The image is automatically fitted inside the A4 page.<br><br>" +

            "Select your image → Create PDF → Download PDF."

        );
    }


    /* FORMATS */

    if (
        q.includes("format") ||
        q.includes("supported") ||
        q.includes("file type") ||
        q.includes("extension")
    ) {

        return (

            "<strong>Supported Formats</strong> 📁<br><br>" +

            "Current image tools support:<br><br>" +

            "• JPG<br>" +
            "• JPEG<br>" +
            "• PNG<br><br>" +

            "The image-to-PDF tool creates PDF documents."

        );
    }


    /* JPG */

    if (
        q.includes("what is jpg") ||
        q.includes("what is jpeg")
    ) {

        return (

            "<strong>JPG / JPEG</strong> 🖼️<br><br>" +

            "JPG is a widely used image format that " +
            "provides good image quality with relatively " +
            "small file sizes.<br><br>" +

            "It is commonly used for photographs and web images."

        );
    }


    /* PNG */

    if (
        q.includes("what is png")
    ) {

        return (

            "<strong>PNG</strong> 🖼️<br><br>" +

            "PNG is an image format that supports " +
            "lossless compression and transparency.<br><br>" +

            "It is useful for graphics, logos and images " +
            "where transparency is important."

        );
    }


    /* PDF */

    if (
        q === "pdf" ||
        q.includes("what is pdf")
    ) {

        return (

            "<strong>PDF</strong> 📄<br><br>" +

            "PDF stands for Portable Document Format.<br><br>" +

            "It is commonly used to share documents while " +
            "keeping their layout consistent."

        );
    }


    /* FEATURES */

    if (
        q.includes("feature") ||
        q.includes("features")
    ) {

        return (

            "<strong>Radix Point Features</strong> ✦<br><br>" +

            "• JPG / PNG conversion<br>" +
            "• Image compression<br>" +
            "• Image resizing<br>" +
            "• Image to PDF<br>" +
            "• Tool search<br>" +
            "• Mobile-friendly design<br>" +
            "• Browser-based processing<br>" +
            "• Privacy-focused tools<br>" +
            "• Basic tools without an account<br>" +
            "• Radix AI assistant"

        );
    }


    /* PRIVACY */

    if (
        q.includes("privacy") ||
        q.includes("upload") ||
        q.includes("safe") ||
        q.includes("secure")
    ) {

        return (

            "<strong>Privacy & Security</strong> 🔒<br><br>" +

            radixKnowledge.privacy +

            "<br><br>" +

            "For the current image tools, processing happens " +
            "locally in your browser."

        );
    }


    /* ACCOUNT */

    if (
        q.includes("account") ||
        q.includes("login") ||
        q.includes("sign up") ||
        q.includes("register")
    ) {

        return (

            "You currently don't need an account to use " +
            "the basic Radix Point image tools. 👍"

        );
    }


    /* MOBILE */

    if (
        q.includes("mobile") ||
        q.includes("phone") ||
        q.includes("android") ||
        q.includes("tablet")
    ) {

        return (

            "<strong>Mobile Support</strong> 📱<br><br>" +

            radixKnowledge.platforms +

            "<br><br>" +

            "You can use Radix Point directly from a mobile browser."

        );
    }


    /* HOW TO USE */

    if (
        q.includes("how to use") ||
        q.includes("how do i use") ||
        q.includes("how can i use") ||
        q.includes("how does it work")
    ) {

        return (

            "<strong>Using Radix Point is simple:</strong> 🚀<br><br>" +

            "1. Open the Tools section.<br>" +
            "2. Choose your tool.<br>" +
            "3. Select your image.<br>" +
            "4. Set options if available.<br>" +
            "5. Tap the tool button.<br>" +
            "6. Download your result."

        );
    }


    /* FREE */

    if (
        q.includes("free") ||
        q.includes("cost") ||
        q.includes("price") ||
        q.includes("paid")
    ) {

        return (

            "<strong>Radix Point</strong> is designed to " +
            "provide free basic online tools for students " +
            "and everyday users. 💙<br><br>" +

            "The current basic image tools don't require " +
            "an account."

        );
    }


    /* SPEED */

    if (
        q.includes("fast") ||
        q.includes("speed") ||
        q.includes("quick")
    ) {

        return (

            "The current image tools process files directly " +
            "inside your browser, so many operations can " +
            "be completed quickly. ⚡"

        );
    }


    /* FUTURE */

    if (
        q.includes("future") ||
        q.includes("coming") ||
        q.includes("next") ||
        q.includes("new tools")
    ) {

        return (

            "<strong>Future of Radix Point</strong> 🚀<br><br>" +

            radixKnowledge.future +

            "<br><br>" +

            "The platform is intended to become a larger " +
            "digital toolbox."

        );
    }


    /* CONTACT */

    if (
        q.includes("contact") ||
        q.includes("email") ||
        q.includes("support") ||
        q.includes("suggestion")
    ) {

        return (

            "<strong>Contact Radix Point</strong> 📧<br><br>" +

            "Email: <strong>" +
            radixKnowledge.email +
            "</strong><br><br>" +

            "You can contact Radix Point for questions, " +
            "suggestions or technical issues."

        );
    }


    /* HELP */

    if (
        q.includes("help") ||
        q.includes("what can you answer") ||
        q.includes("what can you do")
    ) {

        return (

            "<strong>I can help with:</strong> 🤖✦<br><br>" +

            "• Radix Point<br>" +
            "• Website features<br>" +
            "• Tool information<br>" +
            "• JPG / PNG / PDF<br>" +
            "• Image compression<br>" +
            "• Image resizing<br>" +
            "• File formats<br>" +
            "• Privacy<br>" +
            "• Mobile usage<br>" +
            "• How to use the tools<br>" +
            "• Future plans<br>" +
            "• Contact information"

        );
    }


    /* THANKS */

    if (
        q.includes("thank") ||
        q.includes("thanks")
    ) {

        return (

            "You're welcome! 😎✦<br><br>" +

            "I'm always ready to help with Radix Point."

        );
    }


    /* GOOD MORNING */

    if (
        q.includes("good morning")
    ) {

        return (

            "Good morning! ☀️<br><br>" +

            "Ready to explore Radix Point?"

        );
    }


    /* GOOD NIGHT */

    if (
        q.includes("good night")
    ) {

        return (

            "Good night! 🌙<br><br>" +

            "See you again at Radix Point. ✦"

        );
    }


    /* HOW ARE YOU */

    if (
        q.includes("how are you") ||
        q.includes("what's up") ||
        q.includes("whats up")
    ) {

        return (

            "I'm running perfectly. 🤖⚡<br><br>" +

            "Ready to help you with Radix Point."

        );
    }


    /* BYE */

    if (
        q === "bye" ||
        q.includes("goodbye") ||
        q.includes("see you")
    ) {

        return (

            "Goodbye! 👋<br><br>" +

            "Thanks for visiting Radix Point."

        );
    }


    /* DEFAULT */

    return (

        "I'm <strong>Radix AI</strong> ✦🤖<br><br>" +

        "I can answer questions about " +
        "<strong>Radix Point</strong>, its tools, " +
        "image formats, PDF conversion, compression, " +
        "resizing, privacy, mobile usage, features " +
        "and future plans.<br><br>" +

        "Try asking:<br>" +

        "• What is Radix Point?<br>" +
        "• What tools are available?<br>" +
        "• How do I compress an image?<br>" +
        "• What formats are supported?<br>" +
        "• Is Radix Point free?<br>" +
        "• Is my image uploaded?<br>" +
        "• Can I use it on Android?"

    );
}


/* =====================================================
   STARTUP
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateQuality();

        console.log(
            "Radix Point loaded successfully."
        );

        console.log(
            "Radix AI is ready."
        );

    }
);