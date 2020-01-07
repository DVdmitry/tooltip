'use strict';
(function () {



    const ElementWrapper = function (element) {
        this.element = element;
    };

    const elem = document.getElementById('tooltip-element');
    elem.setAttribute('class', 'tooltip-element');

    const tooltipContainer = document.createElement('div');
    tooltipContainer.setAttribute('class', 'tooltip-container');

    function removeTooltip() {
        elem.removeChild(tooltipContainer);
    }

    function $(htmlElement) {
        const elem = document.getElementById(htmlElement);
        return new ElementWrapper(elem);
    }

    ElementWrapper.prototype.showToolTip = function (titleConfig) {
        let elemHeight;
        let tooltipHeight;

        const anotherTooltipContainer = document.createElement('div');
        anotherTooltipContainer.setAttribute('class', 'another-tooltip-container');

        const tooltip = document.createElement('div');
        tooltip.setAttribute('class', 'tooltip');

        const tooltipTitle = document.createElement('p');
        tooltipTitle.setAttribute('class', 'tooltip-title');
        tooltipTitle.innerHTML = titleConfig.title;

        const tooltipContent = document.createElement('p');
        tooltipContent.setAttribute('class', 'tooltip-content');
        tooltipContent.innerHTML = titleConfig.content;

        const triangle = document.createElement('div');
        triangle.setAttribute('class', 'triangle');

        const triangleCover = document.createElement('div');
        triangleCover.setAttribute('class', 'triangle-cover');

        const buttonContainer = document.createElement('div');
        buttonContainer.setAttribute('class', 'button-container');

        const approveButton = document.createElement('button');

        approveButton.innerHTML = 'Okay';
        approveButton.addEventListener('click', titleConfig.onApprove);

        tooltipContainer.appendChild(anotherTooltipContainer);
        anotherTooltipContainer.appendChild(tooltip);

        tooltip.appendChild(triangle);
        triangle.appendChild(triangleCover);
        tooltip.appendChild(tooltipTitle);
        tooltip.appendChild(tooltipContent);
        tooltip.appendChild(buttonContainer);
        buttonContainer.appendChild(approveButton);

        elem.addEventListener('mouseenter', tooltipAppearance);

        elem.addEventListener('mouseleave', function (event) {
            removeTooltip();
        });

        function tooltipAppearance(event) {
            const {target} = event;
            target.appendChild(tooltipContainer);
            elemHeight = target.offsetHeight;
            tooltipHeight = tooltip.offsetHeight;
            const yPosition = getPosition(target);

            if (yPosition > tooltipHeight + 5) {
                tooltipContainer.setAttribute('style', 'bottom: ' + (tooltipHeight + elemHeight + 22) + 'px');
                if (triangle.classList.contains('triangle-top')) {
                    triangle.classList.remove('class', 'triangle-top');
                }
                triangle.classList.add('class', 'triangle-bottom');
            } else {
                if (triangle.classList.contains('triangle-bottom')) {
                    triangle.classList.remove('class', 'triangle-bottom');
                }
                triangle.classList.add('class', 'triangle-top');
            }
        }

        function getPosition(element) {
            let yPosition = 0;
            while (element) {
                yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
                element = element.offsetParent;
            }
            return yPosition;
        }
    };

    $('tooltip-element').showToolTip({
        title: 'This is the title',
        content: 'This is the content',
        onApprove: function () {
            removeTooltip();
        }
    });

})();
