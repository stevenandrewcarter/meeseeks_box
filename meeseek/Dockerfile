FROM golang
ADD main.go .
RUN go build -o meeseeks

FROM alpine
COPY --from=0 ./meeseeks .
CMD [meeseeks]