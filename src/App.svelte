<script>
    export let color1, color2;

    let buttons = [
        { value: "to_top", icon: "↑" },
        { value: "to_bottom", icon: "↓" },
        { value: "to_right", icon: "→" },
        { value: "to_left", icon: "←" },
        { value: "to_top_right", icon: "↗" },
        { value: "to_bottom_left", icon: "↙" },
        { value: "to_bottom_right", icon: "↘" },
        { value: "to_top_left", icon: "↖" },
    ];

    let direction = "to_top_right";
    $: code = generateGradient(direction, color1, color2);

    const setDirection = (value) => {
        direction = value;
    };

    // Generate Gradient
    const generateGradient = (direction, color1, color2) => {
        let dir = direction.replaceAll("_", " ");
        let cssCode =
            "linear-gradient(" + dir + ", " + color1 + ", " + color2 + ")";

        document.querySelector("body").style.backgroundImage = cssCode;

        return cssCode;
    };

    // Copy
    let copytext;
    let copybtn = "COPY";
    const copyCode = () => {
        copytext.select();
        document.execCommand("copy");
        copybtn = "COPIED";
        setTimeout(() => {
            copybtn = "COPY";
        }, 500);
    };
</script>

<main>
    <div class="container">
        <div class="colors">
            <input type="color" bind:value={color1} />
            <input type="color" bind:value={color2} />
        </div>

        <div class="direction">
            {#each buttons as row (row.value)}
                <button
                    class:active={direction == row.value}
                    on:click={() => setDirection(row.value)}>{row.icon}</button
                >
            {/each}
        </div>

        <textarea class="output" bind:this={copytext}
            >background-image: {code};</textarea
        >

        <div class="buttons">
            <button class="copybtn" on:click={copyCode}>{copybtn}</button>
        </div>
    </div>
</main>

<style lang="scss">
    main {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .container {
        width: 400px;
        padding: 30px;
        border-radius: 10px;
        background: #fff;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }
    .colors {
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: space-around;
        input {
            appearance: none;
            width: 120px;
            padding: 0;
            margin: 0;
            border: 0;
            height: 40px;
            border-radius: 20px;
            cursor: pointer;
        }
        input::-webkit-color-swatch {
            border: none;
            border-radius: 20px;
        }
    }
    .direction {
        width: 100%;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        margin: 30px 0;
        button {
            display: block;
            width: 35px;
            height: 35px;
            background: #fff;
            padding: 0;
            margin: 0;
            border: 2px solid #ddd;
            border-radius: 5px;
            font-size: 20px;
            font-weight: 700;
            cursor: pointer;
            &.active {
                color: #fff;
                background-color: #321fda;
                border-color: #321fda;
            }
        }
    }

    .output {
        width: 100%;
        background: #eee;
        padding: 15px;
        min-height: 80px;
        border-radius: 5px;
        line-height: 25px;
        pointer-events: none;
        border: 0;
        resize: none;
        outline: none;
    }

    .buttons {
        width: 100%;
        text-align: center;
        margin-top: 20px;
        button {
            border: 0;
            padding: 8px 20px;
            color: #fff;
            background-color: #321fda;
            border-radius: 10px;
            cursor: pointer;
            font-size: 14px;
        }
    }

    @media (max-width: 499px) {
        main {
            padding: 0 20px;
        }
        .container {
            padding: 25px 10px;
        }
    }
</style>
