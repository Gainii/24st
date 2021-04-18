var scene, guestbook

window.onload = () => {

    scene = new Scene()
    scene.init()

    guestbook = new Guestbook()
    guestbook.init()
}

const switchLanguage = () => {
    const current = document.getElementsByTagName("html")[0].getAttribute("lang").substr(0, 2)
    document.cookie = "lang=" + (current == "en" ? "zh" : "en")
    location.reload()
}


class Scene {
    constructor() {
        this.controller = new ScrollMagic.Controller()
    }
    init() {
        this.controller.addScene([
            this.head(),
            this.origin(),
            this.divide(),
            this.summery(),
            this.photo(),
            this.inherit(),
            this.camarts(),
            this.camartsShowcase(),
            this.markly(),
            this.vary(),
        ])
    }
    head() {
        const tween = new TimelineMax().add([
            TweenMax.fromTo("#heading", 1, {zIndex: 1, z: 1}, {yPercent: -23.6, autoAlpha: 0, ease: Linear.easeNone}),
            TweenMax.fromTo("#subheading", 1, {zIndex: 1}, {yPercent: -14.5, autoAlpha: 0, ease: Linear.easeNone}),
            TweenMax.to("#slice-left", 1, {yPercent: -38.2, autoAlpha: 0, ease: Linear.easeNone}),
            TweenMax.to("#slice-right", 1, {yPercent: -61.8, autoAlpha: 0, ease: Linear.easeNone})
        ])

        return new ScrollMagic.Scene({
            duration: "61.8%"
        })
            .setTween(tween)
    }
    origin() {
        const tween = new TimelineMax().add([
            TweenMax.to("#text-origin-a", .5, {yPercent: -30, autoAlpha: 0, ease: Linear.easeNone}),
            TweenMax.to("#text-origin-b", .5, {yPercent: -30, autoAlpha: 0, ease: Linear.easeNone}),
            TweenMax.fromTo("#text-reference-a", .5, {yPercent: 30, autoAlpha: 0}, {yPercent: -30, autoAlpha: 1, ease:Linear.easeNone}),
            TweenMax.fromTo("#text-reference-b", .5, {yPercent: 30, autoAlpha: 0}, {yPercent: -30, autoAlpha: 1, ease:Linear.easeNone}),
        ])

        return new ScrollMagic.Scene({
            triggerElement: "#content-origin",
            triggerHook: .4,
            duration: "38.2%",
        })
            .setTween(tween)
    }
    divide() {
        const tween = new TimelineMax().add([
            TweenMax.to("#text-divide-a", .5, {yPercent: -30, autoAlpha: 0, ease: Linear.easeNone}),
            TweenMax.to("#text-divide-b", .5, {yPercent: -30, autoAlpha: 0, ease: Linear.easeNone}),
            TweenMax.to("#text-divide-c", .5, {yPercent: -30, autoAlpha: 0, ease: Linear.easeNone}),
            TweenMax.to("#text-divide-d", .5, {yPercent: -30, autoAlpha: 0, ease: Linear.easeNone}),
            TweenMax.staggerFrom(".text-formula", .5, {yPercent: -50, autoAlpha: 0, ease:Linear.easeNone}, .1),
        ])

        return new ScrollMagic.Scene({
            triggerElement: "#content-divide",
            triggerHook: .25,
            duration: "68.2%",
        })
            .setTween(tween)
    }
    summery(){
        const tween = new TimelineMax().add([
            TweenMax.staggerFrom(".text-summery", 1, {yPercent: -50, autoAlpha: 0, ease:Linear.easeNone}, .3),
        ])

        return new ScrollMagic.Scene({
            triggerElement: "#content-summery",
            triggerHook: .8,
            duration: "48.2%",
        })
            .setTween(tween)
    }
    photo() {
        const tween = new TimelineMax().add([
            TweenMax.to("#group", 1, {rotationX: 6, rotationY: 0, rotationZ: 15, ease: Linear.easeNone}),
            TweenMax.fromTo("#photo-a", 1, {"-webkit-filter": "blur(0)"}, {"-webkit-filter": `blur(0)`, scale: 1.3, xPercent: -38.2, yPercent: -38.2, ease: Linear.easeIn}),
            TweenMax.to("#photo-b", 1, {xPercent: -18.2, yPercent: -18.2, ease: Linear.easeIn}),
            TweenMax.fromTo("#photo-c", 1, {"-webkit-filter": "blur(0)"}, {"-webkit-filter": `blur(0)`, scale: 1.6, xPercent: -61.8, yPercent: -61.8, ease: Linear.easeIn}),
            TweenMax.to("#photo-d", 1, {xPercent: -1.8, yPercent: -1.8, ease: Linear.easeIn}),
            TweenMax.fromTo("#photo-e", 1, {"-webkit-filter": "blur(0)"}, {"-webkit-filter": `blur(0)`, scale: 1.8, xPercent: -88.8, yPercent: -88.8, ease: Linear.easeIn}),
            TweenMax.fromTo("#photo-f", 1, {"-webkit-filter": "blur(0)"}, {"-webkit-filter": `blur(0)`, scale: 1.6, xPercent: -61.8, yPercent: -61.8, ease: Linear.easeIn}),
            TweenMax.fromTo("#photo-g", 1, {"-webkit-filter": "blur(0)"}, {"-webkit-filter": `blur(0)`, xPercent: -38.2, yPercent: -38.2, ease: Linear.easeIn}),
            TweenMax.fromTo("#photo-h", 1, {"-webkit-filter": "blur(0)"}, {"-webkit-filter": `blur(0)`, xPercent: -21.8, yPercent: -21.8, ease: Linear.easeIn})
        ])

        return new ScrollMagic.Scene({
            triggerElement: "#content-table",
            triggerHook: .1,
            duration: "100%",
        })
            .setTween(tween)
    }
    inherit() {
        const tween = new TimelineMax().add([
            TweenMax.staggerFrom(".text-inherit", 1, {yPercent: -30, autoAlpha: 0, ease:Linear.easeNone}, .3),
        ])

        return new ScrollMagic.Scene({
            triggerElement: "#content-inherit",
            triggerHook: .7,
            duration: "38.2%",
        })
            .setTween(tween)
    }
    name() {
        const tween = new TimelineMax().add([
            TweenMax.fromTo("#text-name", .5, {yPercent: 30, autoAlpha: 0}, {yPercent: -30, autoAlpha: 1, ease:Linear.easeNone}),
        ])

        return new ScrollMagic.Scene({
            triggerElement: "#content-name",
            triggerHook: .25,
            duration: "28.2%",
        })
            .setTween(tween)
    }
    camarts() {
        const tween = new TimelineMax().add([
            TweenMax.fromTo("#text-camarts", 1, {y: "-50vh"}, {y: 0, ease: Linear.easeNone}),
            TweenMax.fromTo("#backdrop", 1, {height: 0}, {height: "100%", ease: Linear.easeNone})
        ])

        return new ScrollMagic.Scene({
            triggerElement: "#camarts",
            triggerHook: 1,
            duration: "100%",
        })
            .setTween(tween)
    }
    camartsShowcase() {
        return new ScrollMagic.Scene({
            triggerElement: "#camarts",
            triggerHook: .1,
            duration: "100%",
        })
            .setClassToggle("#camarts", "active")
    }
    markly() {
        const tween = new TimelineMax().add([
            TweenMax.to("#markly-showcase-a", 1, {yPercent: -10, ease: Linear.easeNone}),
            TweenMax.to("#markly-showcase-b", 1, {yPercent: -30, ease: Linear.easeNone})
        ])

        return new ScrollMagic.Scene({
            triggerElement: "#markly",
            triggerHook: .1,
            duration: "100%",
        })
            .setTween(tween)
    }
    vary() {
        const tween = new TimelineMax().add([
            TweenMax.from("#vary-showcase-a", 1, {xPercent: 10, ease: Linear.easeNone}),
            TweenMax.from("#vary-showcase-b", 1, {xPercent: 30, ease: Linear.easeNone}),
            TweenMax.from("#vary-showcase-c", 1, {xPercent: 60, ease: Linear.easeNone}),
        ])

        return new ScrollMagic.Scene({
            triggerElement: "#vary",
            triggerHook: .9,
            duration: "100%",
        })
            .setTween(tween)
    }
}

class Guestbook {
    constructor() {
        this.messages = this.element("recent-messages")
        this.container = this.element("new-message")
        this.nextButton = this.element("next-step-button")
        this.contentField = this.element("message-content")
        this.nameField = this.element("message-name")
        this.emailField = this.element("message-email")
        this.URLField = this.element("message-url")
    }
    init() {
        if (!this.messages) return

        this.GET(xhr => {
            if (xhr.status == 200 || xhr.status == 201) {
                this.render(JSON.parse(xhr.responseText))
                this.messages.parentNode.classList += " fetched"
            } else
                console.error("Failed to load messages")
        })
    }
    render(items) {
        items.forEach(item => this.messages.insertAdjacentHTML("beforeend", this.template(item)))
    }
    template(item) {
        return `<div class="message">
					<header>
						<img src="${ item.avatar || "?" }" />
						<h3>${ item.name }</h3>
					</header>
					<div class="message-content">
						<p>${ item.content }</p>
					</div>
				</div>`
    }
    element(id) {
        return document.getElementById(id)
    }
    next() {
        this.container.className = "second-step"
    }
    post(button) {
        const data = {
            post: 1008,
            content: this.contentField.value,
            author_name: this.nameField.value,
            author_email: this.emailField.value,
            author_url: this.URLField.value,
            author_user_agent: navigator.userAgent + " DWAPI/7.0"
        }

        const re = /\S+@\S+\.\S+/;
        if (data.author_email.length > 0 && !re.test(data.author_email)) {
            console.info("Todo: handle invalid email address")
            return
        }

        button.className = "posting"
        button.innerHTML = "";

        this.POST(data, xhr => {
            if (xhr.status == 200 || xhr.status == 201)
                this.messageDidPost()
            else
                alert("Please try again later")
        })
    }
    contentDidChange(e) {
        this.nextButton.className = e.value.length < 5 ? "inactive" : ""
    }
    messageDidPost() {
        this.container.className = "third-step"
    }
    request(path, method, payload, callback) {
        const xhr = new XMLHttpRequest()
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && callback)
                callback(xhr)
        }
        xhr.open(method, "https://blog.dandyweng.com/wp-json/wp/v2/" + path, true)
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.send(JSON.stringify(payload))
    }
    GET(callback) {
        this.request("homepage-comment", "GET", null, callback)
    }
    POST(payload, callback) {
        this.request("comments", "POST", payload, callback)
    }
}