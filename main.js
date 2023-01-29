"use strict";
(function () {
const $_id = (id) => document.getElementById(id);
const RELEASE_URL = 'https://api.github.com/repos/vgmstream/vgmstream-releases/releases/tags/nightly'

function load_changelog() {
    
    
    
}

function set_changelog() {
    let changelog_done = false;
    let changelog_error = false;
    let $changelog_link = $_id('changelog-link');
    let $changelog_body = $_id('changelog-body');
    let prevent_default = false;
    
    $changelog_link.addEventListener('click', (event) => {
        // in case of github oddities don't prevent default
        if (changelog_error) {
            return;
        }

        event.preventDefault();


        if (changelog_done) {
            $changelog_body.classList.toggle('is-hidden');
            return;
        }

        fetch(RELEASE_URL)
            .then((res) => res.json())
            .then((response) => {
                changelog_error = false;
                changelog_done = true;

                if (response.body) {
                    let body_clean = response.body;
                    console.log(body_clean);
                    body_clean = body_clean.substring(body_clean.indexOf("###"));
                    body_clean = body_clean.substring(0, body_clean.indexOf("</details>"));
                    $changelog_body.textContent = body_clean;
                    $changelog_body.classList.toggle('is-hidden');
                }
            })
            .catch((error) => {
                changelog_error = true;
                console.error('Error:', error);
            });
    });
}

//auto
set_changelog();
})();
