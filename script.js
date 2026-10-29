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
   Targets a maximum output size of 15 KB.
===================================================== */

/* =========================================================
   IMAGE COMPRESSOR
   User can enter any target size in KB
   ========================================================= */

function ensureCompressTargetInput() {
    if (document.getElementById("compressTargetSize")) {
        return;
    }

    const result = document.getElementById("compressResult");

    if (!result) {
        return;
    }

    const container = result.parentElement;

    const wrapper = document.createElement("div");
    wrapper.id = "compressTargetWrapper";
    wrapper.style.margin = "12px 0";

    const label = document.createElement("label");
    label.textContent = "Target Size (KB): ";
    label.style.display = "block";
    label.style.marginBottom = "6px";
    label.style.fontWeight = "600";

    const input = document.createElement("input");
    input.type = "number";
    input.id = "compressTargetSize";
    input.min = "1";
    input.max = "10240";
    input.step = "1";
    input.value = "50";
    input.placeholder = "Example: 10, 20, 50, 100";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";
    input.style.padding = "10px";
    input.style.borderRadius = "8px";
    input.style.border = "1px solid #ccc";
    input.style.fontSize = "16px";

    label.appendChild(input);
    wrapper.appendChild(label);

    /* Put target-size box before the Compress button */
    const button = container.querySelector(
        'button[onclick="compressImage()"]'
    );

    if (button) {
        container.insertBefore(wrapper, button);
    } else {
        container.insertBefore(wrapper, result);
    }
}


async function compressImage() {

    const input = document.getElementById("compressInput");
    const result = document.getElementById("compressResult");

    ensureCompressTargetInput();

    const targetInput =
        document.getElementById("compressTargetSize");

    if (!input || !input.files || !input.files[0]) {
        if (result) {
            result.innerHTML =
                "<p>Please select an image first.</p>";
        }
        return;
    }

    if (!targetInput) {
        if (result) {
            result.innerHTML =
                "<p>Target size field is missing.</p>";
        }
        return;
    }

    const targetKB = parseFloat(targetInput.value);

    if (!Number.isFinite(targetKB) || targetKB <= 0) {
        if (result) {
            result.innerHTML =
                "<p>Please enter a valid target size such as 10, 20, 50 or 100 KB.</p>";
        }
        return;
    }

    if (targetKB > 10240) {
        if (result) {
            result.innerHTML =
                "<p>Maximum target size is 10240 KB (10 MB).</p>";
        }
        return;
    }

    const file = input.files[0];
    const TARGET_BYTES = targetKB * 1024;

    result.innerHTML =
        "<p>Compressing image to approximately " +
        targetKB +
        " KB...</p>";

    try {

        const image = new Image();

        image.onload = async function () {

            let scale = Math.min(
                1,
                2400 / Math.max(image.width, image.height)
            );

            let bestBlob = null;
            let bestWidth = 0;
            let bestHeight = 0;

            /*
             * Keep reducing dimensions until the requested
             * target size can be achieved.
             */
            for (let scaleTry = 0; scaleTry < 12; scaleTry++) {

                const width = Math.max(
                    1,
                    Math.round(image.width * scale)
                );

                const height = Math.max(
                    1,
                    Math.round(image.height * scale)
                );

                const canvas = document.createElement("canvas");

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext("2d");

                if (!ctx) {
                    throw new Error("Canvas is not supported.");
                }

                /* White background for transparent PNG images */
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, width, height);

                ctx.drawImage(
                    image,
                    0,
                    0,
                    width,
                    height
                );

                let low = 0.01;
                let high = 0.98;

                let currentBest = null;

                /*
                 * Binary search for the highest JPEG quality
                 * that remains under the requested target.
                 */
                for (let attempt = 0; attempt < 12; attempt++) {

                    const quality =
                        (low + high) / 2;

                    const blob = await new Promise(resolve => {

                        canvas.toBlob(
                            resolve,
                            "image/jpeg",
                            quality
                        );

                    });

                    if (!blob) {
                        continue;
                    }

                    if (blob.size <= TARGET_BYTES) {

                        currentBest = blob;

                        /*
                         * We can increase quality.
                         */
                        low = quality;

                    } else {

                        /*
                         * File is too large.
                         */
                        high = quality;
                    }
                }

                /*
                 * Save the best result found for this dimension.
                 */
                if (currentBest) {

                    bestBlob = currentBest;
                    bestWidth = width;
                    bestHeight = height;

                    /*
                     * We successfully reached the requested
                     * target, so stop reducing dimensions.
                     */
                    break;
                }

                /*
                 * Target is too small for the current dimensions.
                 * Reduce dimensions and try again.
                 */
                scale *= 0.80;

                if (scale < 0.05) {
                    break;
                }
            }

            /*
             * If no result could reach the target, create the
             * smallest possible version we can.
             */
            if (!bestBlob) {

                const finalScale = Math.max(
                    0.05,
                    scale
                );

                const width = Math.max(
                    1,
                    Math.round(image.width * finalScale)
                );

                const height = Math.max(
                    1,
                    Math.round(image.height * finalScale)
                );

                const canvas =
                    document.createElement("canvas");

                canvas.width = width;
                canvas.height = height;

                const ctx =
                    canvas.getContext("2d");

                ctx.fillStyle = "#ffffff";
                ctx.fillRect(
                    0,
                    0,
                    width,
                    height
                );

                ctx.drawImage(
                    image,
                    0,
                    0,
                    width,
                    height
                );

                bestBlob = await new Promise(resolve => {

                    canvas.toBlob(
                        resolve,
                        "image/jpeg",
                        0.01
                    );

                });

                bestWidth = width;
                bestHeight = height;
            }

            if (!bestBlob) {
                throw new Error(
                    "Unable to create compressed image."
                );
            }

            const compressedKB =
                bestBlob.size / 1024;

            const originalKB =
                file.size / 1024;

            const url =
                URL.createObjectURL(bestBlob);

            result.innerHTML = `
                <div style="margin-top:15px;">

                    <p>
                        <strong>Target:</strong>
                        ${targetKB.toFixed(2)} KB
                    </p>

                    <p>
                        <strong>Original:</strong>
                        ${originalKB.toFixed(2)} KB
                    </p>

                    <p>
                        <strong>Compressed:</strong>
                        ${compressedKB.toFixed(2)} KB
                    </p>

                    <p>
                        <strong>Dimensions:</strong>
                        ${bestWidth} × ${bestHeight}
                    </p>

                    ${
                        compressedKB <= targetKB
                        ?
                        `<p style="color:green;">
                            ✓ Target size achieved
                        </p>`
                        :
                        `<p style="color:#d97706;">
                            Target could not be reached at
                            the available dimensions.
                        </p>`
                    }

                    <a
                        href="${url}"
                        download="compressed-image.jpg"
                        style="
                            display:inline-block;
                            margin-top:8px;
                            padding:10px 16px;
                            border-radius:8px;
                            text-decoration:none;
                            color:white;
                            background:linear-gradient(
                                135deg,
                                #2563eb,
                                #06b6d4
                            );
                        "
                    >
                        Download Compressed Image
                    </a>

                </div>
            `;
        };

        image.onerror = function () {

            result.innerHTML =
                "<p>Unable to load this image.</p>";
        };

        image.src =
            URL.createObjectURL(file);

    } catch (error) {

        console.error(
            "Image compression error:",
            error
        );

        result.innerHTML =
            "<p>Compression failed. Please try another image.</p>";
    }
}


/* Create the target-size field when the page loads */
document.addEventListener(
    "DOMContentLoaded",
    function () {
        ensureCompressTargetInput();
    }
);


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
   Supports adding images in multiple selections and removing them.
===================================================== */

var pdfSelectedImages = [];

function renderPdfImageList() {
    var list = document.getElementById("pdfImageList");
    if (!list) return;

    if (!pdfSelectedImages.length) {
        list.innerHTML = '<div class="pdf-empty-state">No images added yet. Choose “Add images” to get started.</div>';
        return;
    }

    list.innerHTML = pdfSelectedImages.map(function(file, index) {
        var previewUrl = URL.createObjectURL(file);
        return '<div class="pdf-image-item">' +
            '<img class="pdf-image-thumb" src="' + previewUrl + '" alt="Preview of ' + escapePdfHtml(file.name) + '">' +
            '<div class="pdf-image-details"><span class="pdf-image-number">Image ' + (index + 1) + '</span>' +
            '<span class="pdf-image-name" title="' + escapePdfHtml(file.name) + '">' + escapePdfHtml(file.name) + '</span>' +
            '<span class="pdf-image-size">' + formatPdfFileSize(file.size) + '</span></div>' +
            '<button type="button" class="pdf-remove-image" aria-label="Remove ' + escapePdfHtml(file.name) + '" title="Remove image" onclick="removePdfImage(' + index + ')">×</button>' +
            '</div>';
    }).join('');
}

function escapePdfHtml(value) {
    return String(value).replace(/[&<>"']/g, function(char) {
        return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char];
    });
}

function formatPdfFileSize(bytes) {
    return bytes < 1024 * 1024 ? (bytes / 1024).toFixed(1) + ' KB' : (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function removePdfImage(index) {
    pdfSelectedImages.splice(index, 1);
    renderPdfImageList();
    var result = document.getElementById("pdfResult");
    if (result) result.innerHTML = '';
}

function addPdfImages(fileList) {
    var result = document.getElementById("pdfResult");
    var validFiles = Array.from(fileList || []).filter(function(file) {
        return file && (/^image\/(jpeg|png)$/i.test(file.type) || /\.(jpe?g|png)$/i.test(file.name));
    });
    if (validFiles.length < (fileList ? fileList.length : 0) && result) {
        result.innerHTML = '<div class="result-box">⚠️ Only JPG and PNG images are supported. Unsupported files were skipped.</div>';
    } else if (result) {
        result.innerHTML = '';
    }
    validFiles.forEach(function(file) {
        var duplicate = pdfSelectedImages.some(function(existing) {
            return existing.name === file.name && existing.size === file.size && existing.lastModified === file.lastModified;
        });
        if (!duplicate) pdfSelectedImages.push(file);
    });
    renderPdfImageList();
}

document.addEventListener("DOMContentLoaded", function() {
    var input = document.getElementById("pdfInput");
    if (input) {
        input.addEventListener("change", function() {
            addPdfImages(input.files);
            // Clear the picker so users can select more images in a later upload.
            input.value = '';
        });
    }
    renderPdfImageList();
});

function createPDF() {
    var input = document.getElementById("pdfInput");
    var result = document.getElementById("pdfResult");

    if (!input || !result) return;

    if (!pdfSelectedImages.length) {
        result.innerHTML = '<div class="result-box">⚠️ Please add one or more JPG or PNG images.</div>';
        return;
    }

    if (!window.jspdf || !window.jspdf.jsPDF) {
        result.innerHTML = '<div class="result-box">⚠️ PDF library could not load. Please check your internet connection and try again.</div>';
        return;
    }

    var files = pdfSelectedImages.slice();
    var orientationInput = document.querySelector('input[name="pdfOrientation"]:checked');
    var marginInput = document.querySelector('input[name="pdfMargin"]:checked');
    var pageSizeInput = document.getElementById("pdfPageSize");
    var rotationInput = document.getElementById("pdfImageRotation");
    var mergeInput = document.getElementById("pdfMergeImages");

    var orientation = orientationInput ? orientationInput.value : "portrait";
    var margin = marginInput ? Number(marginInput.value) : 0;
    var pageSize = pageSizeInput ? pageSizeInput.value : "a4";
    var rotation = rotationInput ? Number(rotationInput.value) : 0;
    var mergeImages = !mergeInput || mergeInput.checked;

    result.innerHTML = '<div class="result-box">Preparing ' + files.length + ' image' +
        (files.length === 1 ? '' : 's') + '…</div>';

    function loadImage(file) {
        return new Promise(function(resolve, reject) {
            var reader = new FileReader();
            reader.onerror = function() { reject(new Error("Could not read " + file.name)); };
            reader.onload = function(event) {
                var img = new Image();
                img.onerror = function() { reject(new Error("Could not open " + file.name)); };
                img.onload = function() {
                    // Rotate the actual image pixels before placing it on the PDF.
                    // 90° and 270° rotations swap the output width and height.
                    var angle = ((rotation % 360) + 360) % 360;
                    var canvas = document.createElement("canvas");
                    var swapDimensions = angle === 90 || angle === 270;
                    canvas.width = swapDimensions ? img.height : img.width;
                    canvas.height = swapDimensions ? img.width : img.height;
                    var context = canvas.getContext("2d");
                    context.translate(canvas.width / 2, canvas.height / 2);
                    context.rotate(angle * Math.PI / 180);
                    context.drawImage(img, -img.width / 2, -img.height / 2);
                    var outputType = file.type === "image/png" ? "image/png" : "image/jpeg";
                    var rotatedData = canvas.toDataURL(outputType, 0.95);
                    var rotatedImage = new Image();
                    rotatedImage.onload = function() {
                        resolve({
                            image: rotatedImage,
                            data: rotatedData,
                            type: file.type === "image/png" ? "PNG" : "JPEG",
                            name: file.name
                        });
                    };
                    rotatedImage.onerror = function() { reject(new Error("Could not rotate " + file.name)); };
                    rotatedImage.src = rotatedData;
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    function getPageDimensions(image) {
        if (pageSize === "fit") {
            var width = image.width * 25.4 / 96;
            var height = image.height * 25.4 / 96;
            if (orientation === "landscape" && height > width) {
                var temp = width; width = height; height = temp;
            } else if (orientation === "portrait" && width > height) {
                var temp2 = width; width = height; height = temp2;
            }
            return [width, height];
        }
        var dims = pageSize === "letter" ? [215.9, 279.4] : [210, 297];
        if (orientation === "landscape") return [dims[1], dims[0]];
        return dims;
    }

    function addImageToPdf(pdf, item, firstPage) {
        if (!firstPage) pdf.addPage();
        var dims = getPageDimensions(item.image);
        var pageWidth = dims[0];
        var pageHeight = dims[1];

        // For fixed page sizes, jsPDF creates the page in the requested format.
        // For Fit, each page is sized to the image's proportions.
        if (pageSize === "fit") {
            if (!firstPage) pdf.deletePage(pdf.getNumberOfPages() - 1);
            if (firstPage) {
                // Re-create the first page using the exact image-based dimensions.
                pdf = new window.jspdf.jsPDF({ orientation: "portrait", unit: "mm", format: dims });
            } else {
                pdf.addPage(dims, "portrait");
            }
            pageWidth = dims[0];
            pageHeight = dims[1];
        } else {
            pageWidth = pdf.internal.pageSize.getWidth();
            pageHeight = pdf.internal.pageSize.getHeight();
        }

        var availableWidth = Math.max(1, pageWidth - margin * 2);
        var availableHeight = Math.max(1, pageHeight - margin * 2);
        var ratio = Math.min(availableWidth / item.image.width, availableHeight / item.image.height);
        var width = item.image.width * ratio;
        var height = item.image.height * ratio;
        var x = (pageWidth - width) / 2;
        var y = (pageHeight - height) / 2;
        pdf.addImage(item.data, item.type, x, y, width, height);
        return pdf;
    }

    Promise.all(files.map(loadImage)).then(function(items) {
        var jsPDF = window.jspdf.jsPDF;
        var downloads = [];

        if (mergeImages) {
            var firstDims = getPageDimensions(items[0].image);
            var pdf = new jsPDF({
                orientation: pageSize === "fit" ? "portrait" : orientation,
                unit: "mm",
                format: pageSize === "fit" ? firstDims : pageSize
            });

            items.forEach(function(item, index) {
                if (index > 0) {
                    if (pageSize === "fit") {
                        var dims = getPageDimensions(item.image);
                        pdf.addPage(dims, "portrait");
                    } else {
                        pdf.addPage(pageSize, orientation);
                    }
                }
                var dimsNow = pageSize === "fit" ? getPageDimensions(item.image) : [
                    pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight()
                ];
                var pageWidth = dimsNow[0], pageHeight = dimsNow[1];
                var availW = Math.max(1, pageWidth - margin * 2);
                var availH = Math.max(1, pageHeight - margin * 2);
                var scale = Math.min(availW / item.image.width, availH / item.image.height);
                var w = item.image.width * scale, h = item.image.height * scale;
                pdf.addImage(item.data, item.type, (pageWidth - w) / 2, (pageHeight - h) / 2, w, h);
            });

            var blob = pdf.output("blob");
            var url = URL.createObjectURL(blob);
            downloads.push({ url: url, name: "radix-point-images.pdf" });
        } else {
            items.forEach(function(item, index) {
                var dims = getPageDimensions(item.image);
                var pdf = new jsPDF({
                    orientation: pageSize === "fit" ? "portrait" : orientation,
                    unit: "mm",
                    format: pageSize === "fit" ? dims : pageSize
                });
                var pageWidth = pdf.internal.pageSize.getWidth();
                var pageHeight = pdf.internal.pageSize.getHeight();
                if (pageSize === "fit") { pageWidth = dims[0]; pageHeight = dims[1]; }
                var availW = Math.max(1, pageWidth - margin * 2);
                var availH = Math.max(1, pageHeight - margin * 2);
                var scale = Math.min(availW / item.image.width, availH / item.image.height);
                var w = item.image.width * scale, h = item.image.height * scale;
                pdf.addImage(item.data, item.type, (pageWidth - w) / 2, (pageHeight - h) / 2, w, h);
                downloads.push({
                    url: URL.createObjectURL(pdf.output("blob")),
                    name: "radix-point-" + (index + 1) + ".pdf"
                });
            });
        }

        result.innerHTML = '<div class="result-box"><strong>✅ PDF' +
            (mergeImages ? ' created' : ' files created') +
            ' successfully!</strong><p>' + downloads.length +
            ' download link' + (downloads.length === 1 ? '' : 's') + ' ready.</p>' +
            downloads.map(function(item) {
                return '<p><a class="download-button" href="' + item.url +
                    '" download="' + item.name + '">Download ' + item.name + '</a></p>';
            }).join('') + '</div>';
    }).catch(function(error) {
        result.innerHTML = '<div class="result-box">⚠️ ' +
            (error.message || 'Could not convert the selected images.') + '</div>';
    });
}

/* Highlight selected orientation and margin cards. */
document.addEventListener("change", function(event) {
    if (!event.target.matches('input[name="pdfOrientation"], input[name="pdfMargin"]')) return;
    var group = event.target.name === "pdfOrientation" ? "orientation" : "margin";
    document.querySelectorAll('[data-choice-group="' + group + '"]').forEach(function(card) {
        var radio = card.querySelector("input");
        card.classList.toggle("selected", !!radio && radio.checked);
    });
});


/* =====================================================
   PDF COMPRESSOR
   Rebuilds PDF pages as optimized JPEG images.
   Processing happens locally in the browser.
===================================================== */

function updatePdfCompression() {

    var slider =
        document.getElementById("pdfCompression");

    var text =
        document.getElementById("pdfCompressionText");

    if (!slider || !text) return;

    var labels = {
        "1": "High quality",
        "2": "Balanced",
        "3": "Smaller file"
    };

    text.textContent =
        labels[slider.value] || "Balanced";
}


async function compressPDF() {

    var input =
        document.getElementById("pdfCompressInput");

    var result =
        document.getElementById("pdfCompressResult");

    var slider =
        document.getElementById("pdfCompression");

    if (!input || !result) return;

    if (!input.files || !input.files.length) {

        result.innerHTML =
            '<div class="result-box">' +
            '⚠️ Please select a PDF file.' +
            '</div>';

        return;
    }

    if (
        typeof window.pdfjsLib === "undefined" ||
        typeof window.jspdf === "undefined" ||
        typeof window.jspdf.jsPDF === "undefined"
    ) {

        result.innerHTML =
            '<div class="result-box">' +
            '⚠️ PDF libraries could not load. ' +
            'Please check your internet connection and try again.' +
            '</div>';

        return;
    }

    var file = input.files[0];

    if (
        window.pdfjsLib &&
        window.pdfjsLib.GlobalWorkerOptions
    ) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    }

    if (file.type !== "application/pdf") {

        result.innerHTML =
            '<div class="result-box">' +
            '⚠️ Please select a valid PDF file.' +
            '</div>';

        return;
    }

    var settings = {
        "1": {
            scale: 1.35,
            quality: 0.78
        },
        "2": {
            scale: 1.15,
            quality: 0.62
        },
        "3": {
            scale: 0.90,
            quality: 0.45
        }
    };

    var level =
        settings[slider ? slider.value : "2"] ||
        settings["2"];

    result.innerHTML =
        '<div class="result-box">' +
        '⏳ Compressing PDF… Please keep this page open.' +
        '</div>';

    try {

        var arrayBuffer =
            await file.arrayBuffer();

        var loadingTask =
            window.pdfjsLib.getDocument({
                data: arrayBuffer
            });

        var pdf =
            await loadingTask.promise;

        var jsPDF =
            window.jspdf.jsPDF;

        var outputPdf = null;

        for (
            var pageNumber = 1;
            pageNumber <= pdf.numPages;
            pageNumber++
        ) {

            var page =
                await pdf.getPage(pageNumber);

            var baseViewport =
                page.getViewport({
                    scale: 1
                });

            var viewport =
                page.getViewport({
                    scale: level.scale
                });

            var canvas =
                document.createElement("canvas");

            canvas.width =
                Math.max(1, Math.floor(viewport.width));

            canvas.height =
                Math.max(1, Math.floor(viewport.height));

            var context =
                canvas.getContext("2d", {
                    alpha: false
                });

            context.fillStyle = "#ffffff";
            context.fillRect(
                0,
                0,
                canvas.width,
                canvas.height
            );

            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;

            var imageData =
                canvas.toDataURL(
                    "image/jpeg",
                    level.quality
                );

            var pageWidth =
                baseViewport.width * 0.2645833333;

            var pageHeight =
                baseViewport.height * 0.2645833333;

            if (!outputPdf) {

                outputPdf =
                    new jsPDF({
                        orientation:
                            pageWidth > pageHeight
                                ? "landscape"
                                : "portrait",
                        unit: "mm",
                        format: [
                            pageWidth,
                            pageHeight
                        ],
                        compress: true
                    });

            } else {

                outputPdf.addPage(
                    [
                        pageWidth,
                        pageHeight
                    ],
                    pageWidth > pageHeight
                        ? "landscape"
                        : "portrait"
                );

            }

            outputPdf.addImage(
                imageData,
                "JPEG",
                0,
                0,
                pageWidth,
                pageHeight,
                undefined,
                "FAST"
            );

            canvas.width = 1;
            canvas.height = 1;
        }

        if (!outputPdf) {
            throw new Error("No PDF pages found.");
        }

        var blob =
            outputPdf.output("blob");

        var url =
            URL.createObjectURL(blob);

        var originalKB =
            (file.size / 1024).toFixed(1);

        var compressedKB =
            (blob.size / 1024).toFixed(1);

        var savedPercent =
            Math.max(
                0,
                (1 - blob.size / file.size) * 100
            ).toFixed(1);

        var message;

        if (blob.size < file.size) {

            message =
                '<strong>✅ PDF compressed successfully!</strong>' +
                '<p>Original: ' +
                originalKB +
                ' KB</p>' +
                '<p>Compressed: ' +
                compressedKB +
                ' KB</p>' +
                '<p>Size reduced by: ' +
                savedPercent +
                '%</p>';

        } else {

            message =
                '<strong>⚠️ The new PDF is not smaller.</strong>' +
                '<p>Original: ' +
                originalKB +
                ' KB</p>' +
                '<p>New: ' +
                compressedKB +
                ' KB</p>' +
                '<p>Try "Smaller file" for stronger compression.</p>';
        }

        result.innerHTML =
            '<div class="result-box">' +
            message +
            '<p>Pages: ' +
            pdf.numPages +
            '</p>' +
            '<a class="download-button" href="' +
            url +
            '" download="radix-point-compressed.pdf">' +
            'Download Compressed PDF' +
            '</a>' +
            '</div>';

    } catch (error) {

        console.error(
            "PDF compression error:",
            error
        );

        result.innerHTML =
            '<div class="result-box">' +
            '⚠️ Could not compress this PDF. ' +
            'Some PDFs may contain content that cannot be rebuilt by this browser-based compressor.' +
            '</div>';
    }
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


/* =====================================================
   NEW TOOLS: MERGE PDF, QR, CALCULATORS, SPLIT PDF,
   PDF TO WORD, TYPING SPEED TEST
===================================================== */
function showToolMessage(id, message, isError) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = '<div class="result-box">' + (isError ? '⚠️ ' : '✅ ') + message + '</div>';
}
function downloadBlob(blob, filename) {
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a'); a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function(){ URL.revokeObjectURL(url); }, 1500);
}
async function mergePDFs() {
    var input = document.getElementById('mergePdfInput');
    if (!input || !input.files || input.files.length < 2) return showToolMessage('mergePdfResult', 'Please select at least two PDF files.', true);
    if (!window.PDFLib) return showToolMessage('mergePdfResult', 'PDF library did not load. Check your internet connection and retry.', true);
    try {
        showToolMessage('mergePdfResult', 'Merging ' + input.files.length + ' files…');
        var merged = await PDFLib.PDFDocument.create();
        for (var file of Array.from(input.files)) {
            var doc = await PDFLib.PDFDocument.load(await file.arrayBuffer());
            var pages = await merged.copyPages(doc, doc.getPageIndices()); pages.forEach(function(page){ merged.addPage(page); });
        }
        downloadBlob(new Blob([await merged.save()], {type:'application/pdf'}), 'radix-point-merged.pdf');
        showToolMessage('mergePdfResult', 'PDF files merged and download started.');
    } catch (e) { showToolMessage('mergePdfResult', 'Could not merge these PDFs. The files may be damaged or password-protected.', true); }
}
function generateQRCode() {
    var text = (document.getElementById('qrText').value || '').trim();
    var result = document.getElementById('qrResult');
    if (!text) return showToolMessage('qrResult', 'Enter a website link or text first.', true);
    if (typeof QRCode === 'undefined') return showToolMessage('qrResult', 'QR library did not load. Check your internet connection.', true);
    var size = Number(document.getElementById('qrSize').value) || 220;
    result.innerHTML = '<div id="qrCodeCanvas" style="display:inline-block;background:#fff;padding:12px;border-radius:8px"></div>';
    new QRCode(document.getElementById('qrCodeCanvas'), {text:text,width:size,height:size,colorDark:'#111827',colorLight:'#ffffff',correctLevel:QRCode.CorrectLevel.M});
    var button = document.createElement('button'); button.textContent = 'Download QR Code'; button.style.marginTop='12px';
    button.onclick = function(){ var holder=document.getElementById('qrCodeCanvas'); var img=holder.querySelector('img'); var canvas=holder.querySelector('canvas'); var url=img && img.src ? img.src : (canvas ? canvas.toDataURL('image/png') : ''); if(!url)return; var a=document.createElement('a');a.href=url;a.download='radix-point-qr.png';a.click(); };
    result.appendChild(button);
}
function calculatePercentage() {
    var a = Number(document.getElementById('percentObtained').value), b = Number(document.getElementById('percentTotal').value);
    if (document.getElementById('percentObtained').value === '' || document.getElementById('percentTotal').value === '' || !Number.isFinite(a) || !Number.isFinite(b) || b <= 0 || a < 0) return showToolMessage('percentageResult','Enter a valid obtained value and a total greater than zero.',true);
    showToolMessage('percentageResult', 'Percentage: <strong>' + (a / b * 100).toFixed(2) + '%</strong>');
}
function calculateCGPA() {
    var raw = document.getElementById('cgpaValues').value.trim();
    var vals = raw.split(/[ ,;]+/).filter(Boolean).map(Number);
    if (!raw || !vals.length || vals.some(function(n){return !Number.isFinite(n) || n < 0 || n > 10;})) return showToolMessage('cgpaResult','Enter valid grade points from 0 to 10, separated by commas.',true);
    var avg = vals.reduce(function(a,b){return a+b;},0) / vals.length;
    showToolMessage('cgpaResult','Average CGPA: <strong>' + avg.toFixed(2) + ' / 10</strong> (' + vals.length + ' semester' + (vals.length===1?'':'s') + ').');
}
async function splitPDF() {
    var input=document.getElementById('splitPdfInput'), start=Number(document.getElementById('splitStartPage').value), end=Number(document.getElementById('splitEndPage').value);
    if (!input.files.length) return showToolMessage('splitPdfResult','Please select a PDF file.',true);
    if (!window.PDFLib) return showToolMessage('splitPdfResult','PDF library did not load. Check your internet connection.',true);
    try {
        var source=await PDFLib.PDFDocument.load(await input.files[0].arrayBuffer()); var count=source.getPageCount();
        if (!Number.isInteger(start)||!Number.isInteger(end)||start<1||end<start||end>count) return showToolMessage('splitPdfResult','Enter a page range between 1 and ' + count + '.',true);
        var out=await PDFLib.PDFDocument.create(); var indices=[]; for(var i=start-1;i<end;i++)indices.push(i);
        var pages=await out.copyPages(source,indices); pages.forEach(function(p){out.addPage(p);});
        downloadBlob(new Blob([await out.save()],{type:'application/pdf'}),'radix-point-pages-'+start+'-'+end+'.pdf');
        showToolMessage('splitPdfResult','Extracted pages ' + start + '–' + end + ' of ' + count + '. Download started.');
    } catch(e){showToolMessage('splitPdfResult','Could not read this PDF. It may be damaged or password-protected.',true);}
}
async function convertPDFToWord() {
    var input=document.getElementById('pdfWordInput');
    if(!input.files.length)return showToolMessage('pdfWordResult','Please select a PDF file.',true);
    if(!window.pdfjsLib)return showToolMessage('pdfWordResult','PDF text library did not load. Check your internet connection.',true);
    try {
        pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        showToolMessage('pdfWordResult','Extracting text from PDF…');
        var data=new Uint8Array(await input.files[0].arrayBuffer()); var pdf=await pdfjsLib.getDocument({data:data}).promise; var parts=[];
        for(var p=1;p<=pdf.numPages;p++){var page=await pdf.getPage(p);var content=await page.getTextContent();var line=content.items.map(function(it){return it.str;}).join(' ');parts.push('<h2>Page '+p+'</h2><p>'+escapeHtml(line).replace(/\s{2,}/g,' ')+'</p>');}
        var docHtml='<!doctype html><html><head><meta charset="utf-8"><style>body{font-family:Arial,sans-serif;line-height:1.5}h2{font-size:14pt;border-bottom:1px solid #ddd}</style></head><body>'+parts.join('<br>')+'</body></html>';
        downloadBlob(new Blob(['\ufeff',docHtml],{type:'application/msword'}), 'radix-point-converted.doc');
        showToolMessage('pdfWordResult','Word-compatible document created. Formatting may differ; scanned PDFs need OCR before conversion.');
    } catch(e){showToolMessage('pdfWordResult','Could not extract text. This PDF may be protected or contain scanned pages only.',true);}
}
function escapeHtml(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}
var typingStartedAt=0, typingTimer=null, typingActive=false;
function startTypingTest(){
    if(typingTimer)clearTimeout(typingTimer); var box=document.getElementById('typingInput');box.value='';box.disabled=false;box.focus();
    var seconds=Number(document.getElementById('typingDuration').value)||60;typingStartedAt=Date.now();typingActive=true;
    document.getElementById('typingResult').textContent='Time left: '+seconds+' seconds';
    function tick(){if(!typingActive)return;var left=Math.max(0,seconds-Math.floor((Date.now()-typingStartedAt)/1000));document.getElementById('typingResult').textContent='Time left: '+left+' seconds';if(left<=0){finishTypingTest();return;}typingTimer=setTimeout(tick,250);} tick();
}
function updateTypingTest(){if(typingActive)renderTypingStats(false);}
function renderTypingStats(finished){
    var typed=document.getElementById('typingInput').value, sample=document.getElementById('typingSample').textContent, elapsed=Math.max(1,(Date.now()-typingStartedAt)/1000);
    var words=typed.trim()?typed.trim().split(/\s+/).length:0, wpm=Math.round(words*60/elapsed), correct=0;for(var i=0;i<Math.min(typed.length,sample.length);i++)if(typed[i]===sample[i])correct++;
    var accuracy=typed.length?Math.round(correct/typed.length*100):0;
    document.getElementById('typingResult').innerHTML=(finished?'Test complete. ':'')+'Speed: <strong>'+wpm+' WPM</strong> · Accuracy: <strong>'+accuracy+'%</strong> · Characters: '+typed.length;
}
function finishTypingTest(){if(!typingActive)return;typingActive=false;if(typingTimer)clearTimeout(typingTimer);document.getElementById('typingInput').disabled=true;renderTypingStats(true);}
