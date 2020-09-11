FROM mongo:4

COPY asl .

COPY import.sh .
RUN chmod +x import.sh

CMD [ "/import.sh" ]
